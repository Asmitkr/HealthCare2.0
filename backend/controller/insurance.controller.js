import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import Insurance from "../models/insurance.model.js";
import InsurancePlans from "../models/insurancePlans.model.js";
import mongoose from "mongoose";

export const ApplyInsurance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Not Valid User" });
    }
    const { startDate, planid } = req.body;
    if (!isValidDate(startDate)) {
      return res.status(400).json({ error: "Start Date Not Valid" });
    }
    if (!planid) {
      return res.status(400).json({ error: "Plan id is not given" });
    }

    const plan = await InsurancePlans.findOne({ _id: planid });
    const endDate = addMonths(startDate, plan.duration);
    if (!plan) {
      return res
        .status(400)
        .json({ error: "No plan record with this plan id" });
    }
    const newinsurance = new Insurance({
      userid: req.user._id,
      companyid: plan.companyid,
      planid: planid,
      startDate,
      endDate,
      amount: plan.amount,
    });

    if (newinsurance) {
      await newinsurance.save();

      res.status(201).json({
        companyname: plan.companyname,
        _id: newinsurance._id,
        startDate: newinsurance.startDate,
        companyid: plan.companyid,
        endDate: newinsurance.endDate,
        status: newinsurance.status,
        amount: newinsurance.amount,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CurrentInsurance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Not a Valid User" });
    }
    const insurs = await Insurance.find({ userid: req.user._id });
    // console.log(insurs);
    if (insurs.length != 0) {
      const insursWithCompanyNames = await Promise.all(
        insurs.map(async (insur) => {
          const company = await Company.findById(insur.companyid);
          return {
            ...insur.toObject(),
            companyname: company.fullName,
          };
        })
      );
      res.status(201).json(insursWithCompanyNames);
    } else {
      res.status(202);
    }
  } catch (error) {
    console.log("xxx");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CompanyInsurance = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not a Valid Company" });
    }
    // Fetch only insurances with status "Accepted"
    const insurs = await Insurance.find({
      companyid: req.company._id,
      status: ["Approved", "Rejected"],
    });
    if (insurs.length != 0) {
      const insursWithUserNames = await Promise.all(
        insurs.map(async (insur) => {
          const user = await User.findById(insur.userid);
          return {
            ...insur.toObject(),
            username: user.fullName,
            email: user.email,
            phone: user.phone,
          };
        })
      );
      res.status(201).json(insursWithUserNames);
    } else {
      res
        .status(202)
        .json({ message: "No records are available for this company" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const pendingInsurance = async (req, res) => {
  try {
    const companyid = req.company._id;

    const pendingRequests = await Insurance.find({
      companyid: companyid,
      status: "Pending",
    }).populate("userid", "-password");
    if (!pendingRequests || pendingRequests.length === 0) {
      return res
        .status(200)
        .json({ message: "No valid pending requests found" });
    }

    pendingRequests.sort((a, b) => {
      const dateA = new Date(
        `${a.date.split("-").reverse().join("-")}T${a.time}`
      );
      const dateB = new Date(
        `${b.date.split("-").reverse().join("-")}T${b.time}`
      );
      return dateA - dateB;
    });

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.log("Error in Pending request", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const ReplyInsurance = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not a valid company" });
    }

    const { _id, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid insurance record ID." });
    }
    const insuranceRecord = await Insurance.findOne({ _id: _id });

    if (!insuranceRecord) {
      return res
        .status(404)
        .json({ error: "No insurance record found for this ID." });
    }

    // Update the status of insurance record
    const updateResult = await Insurance.updateOne(
      { _id: _id },
      { $set: { status: status } }
    );

    if (updateResult.modifiedCount === 1) {
      return res.status(201).json({
        _id: insuranceRecord._id,
        status: status,
      });
    } else {
      return res.status(203).json({
        message: "Error in updating status/reply or it is already updated",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ApplyClaim = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Not a valid user" });
    }

    const { _id, description } = req.body;

    console.log(_id, description);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid insurance record ID." });
    }
    // Find insurance record by _id
    const insuranceRecord = await Insurance.findOne({ _id: _id });
    console.log(insuranceRecord);
    if (!insuranceRecord || insuranceRecord.status != "Approved") {
      return res
        .status(404)
        .json({ error: "No insurance record found for this ID." });
    }

    // Update the status of insurance record
    const updateResult = await Insurance.updateOne(
      { _id: _id },
      { $set: { Desc: description, claimRequest: "Applied" } }
    );

    if (updateResult.modifiedCount === 1) {
      return res.status(201).json({
        _id: insuranceRecord._id,
        Desc: description,
        claimRequest: "Applied",
      });
    } else {
      return res.status(203).json({
        message: "Error in applying claim or it is already updated",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ReplyClaim = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not a valid company" });
    }

    const { _id, claimReply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid insurance record ID." });
    }
    // Find insurance record by _id
    const insuranceRecord = await Insurance.findOne({ _id: _id });

    if (!insuranceRecord) {
      return res
        .status(404)
        .json({ error: "No insurance record found for this ID." });
    }

    // Update the status of insurance record
    const updateResult = await Insurance.updateOne(
      { _id: _id },
      { $set: { claimRequest: claimReply } }
    );

    if (updateResult.modifiedCount === 1) {
      return res.status(201).json({
        _id: insuranceRecord._id,
        claimRequest: claimReply,
      });
    } else {
      return res.status(203).json({
        message: "Error in updating claimRequest or it is already updated",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

function isValidDate(dateString) {
  // Check if the date string matches the format dd-mm-yyyy
  var regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  var match = regex.exec(dateString);
  if (!match) {
    return false;
  }

  // Parse the date parts
  var day = parseInt(match[1], 10);
  var month = parseInt(match[2], 10);
  var year = parseInt(match[3], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month <= 0 || month > 12) {
    return false;
  }

  // Check the range of day
  var monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    // In a leap year, February has 29 days.
    monthLengths[1] = 29;
  }
  return day > 0 && day <= monthLengths[month - 1];
}

function addMonths(startDateStr, monthsToAddStr) {
  // Parse the start date string
  let parts = startDateStr.split("-");
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1; // JavaScript months are zero-indexed
  let year = parseInt(parts[2], 10);

  // Parse the months to add string
  let monthsToAdd = parseInt(monthsToAddStr, 10);

  // Create a date object from the start date
  let startDate = new Date(year, month, day);

  // Add the specified number of months
  startDate.setMonth(startDate.getMonth() + monthsToAdd);

  // Handle end-of-month edge cases
  if (startDate.getDate() !== day) {
    startDate.setDate(0); // Set to the last day of the previous month
  }

  // Format the final date
  let finalDay = ("0" + startDate.getDate()).slice(-2);
  let finalMonth = ("0" + (startDate.getMonth() + 1)).slice(-2); // Months are zero-indexed
  let finalYear = startDate.getFullYear();

  return `${finalDay}-${finalMonth}-${finalYear}`;
}
