import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import Insurance from "../models/insurance.model.js";
import InsurancePlans from "../models/insurancePlans.model.js";
import mongoose from 'mongoose';

export const ApplyInsurance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Not Valid User" });
    }
    const { startDate,Planid} = req.body;
    if (!isValidDate(startDate)) {
      return res.status(400).json({ error: "Start Date Not Valid" });
    }
    if(!Planid){
      return res.status(400).json({error:"Plan id is not given"});
    }

    const plan = await InsurancePlans.findOne({ _id:Planid });
    const endDate=addMonths(startDate,plan.duration);
    if (!plan) {
      return res
        .status(400)
        .json({ error: "No plan record with this plan id" });
    }
    const newinsurance = new Insurance({
      userid: req.user._id,
      companyid:plan.companyid,
      planid: Planid,
      startDate,
      endDate,
      amount:plan.amount,
    });

    if (newinsurance) {
      await newinsurance.save();

      res.status(201).json({
        _id: newinsurance._id,
        startDate: newinsurance.startDate,
        companyid:plan.companyid,
        endDate: newinsurance.endDate,
        status: newinsurance.status,
        amount: newinsurance.amount,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in Apply Insurance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CurrentInsurance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Not a Valid User" });
    }
    const insurs = await Insurance.find({ userid: req.user._id });
    if (insurs.length != 0) {
      res.status(201).json(insurs);
    } else {
      res.status(202);
    }
  } catch (error) {
    console.log("Error in Current Insurance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CompanyInsurance = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not a Valid Company" });
    }
    const insurs = await Insurance.find({ companyid: req.company._id });
    if (insurs.length != 0) {
      res.status(201).json(insurs);
    } else {
      res.status(202);
    }
  } catch (error) {
    console.log("Error in company Insurance controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ReplyInsurance = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not a valid company" });
    }

    const { _id, status} = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid insurance record ID." });
    }
    // Find insurance record by _id
    const insuranceRecord = await Insurance.findOne({ _id:_id});

    if (!insuranceRecord) {
      return res
        .status(404)
        .json({ error: "No insurance record found for this ID." });
    }

    // Update the status of insurance record
    const updateResult = await Insurance.updateOne(
      {_id:_id},
      { $set: { status: status }}
    );

    if (updateResult.modifiedCount === 1) {
      return res.status(201).json({
        _id: insuranceRecord._id,
        status: status,
      });
    } else {
      console.log(updateResult);
      return res
        .status(203)
        .json({ message: "Error in updating status/reply or it is already updated" });
    }
  } catch (error) {
    console.error("Error in ReplyInsurance controller:", error.message);
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
