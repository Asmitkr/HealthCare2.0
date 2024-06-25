import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import Insurance from "../models/insurance.model.js";

export const ApplyInsurance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Not Valid User" });
    }
    const { startDate, endDate, amount, email } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email Not Valid" });
    }
    if (!isValidDate(startDate)) {
      return res.status(400).json({ error: "Start Date Not Valid" });
    }
    if (!isValidDate(endDate)) {
      return res.status(400).json({ error: "Start Date Not Valid" });
    }
    if (amount <= 0) {
      return res.status(400).json({ error: "Amount is not valid" });
    }
    if (!isFirstDateGreater(endDate, startDate)) {
      return res
        .status(400)
        .json({ error: "Start Date and End Date are Not Valid" });
    }
    const comp = await Company.findOne({ email });
    if (!comp) {
      return res
        .status(400)
        .json({ error: "a Company with this email Does not exist" });
    }
    const newinsurance = new Insurance({
      userid: req.user._id,
      companyid: comp._id,
      startDate,
      endDate,
      amount,
    });

    if (newinsurance) {
      await newinsurance.save();

      res.status(201).json({
        _id: newinsurance._id,
        startDate: newinsurance.startDate,
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
      return res.status(400).json({ error: "Not Valid User" });
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

export const ReplyInsurance = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not a valid company" });
    }

    const { _id, status } = req.body;

    // Find insurance record by _id
    const insuranceRecord = await Insurance.findOne({ _id: _id });

    if (!insuranceRecord) {
      return res
        .status(404)
        .json({ error: "No insurance record found for this ID." });
    }

    // Update the status of insurance record
    const updateResult = await Insurance.updateOne(
      { _id: _id},
      { $set: { status: status } }
    );

    if (updateResult.modifiedCount === 1) {
      return res.status(201).json({
        _id: insuranceRecord._id,
        status: status,
      });
    } else {
      return res
        .status(203)
        .json({ message: "Error in updating status/reply or it is already updated" });
    }
  } catch (error) {
    console.error("Error in ReplyInsurance controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

function isValidEmail(email) {
  const re = /@.*\.com/;
  return re.test(email);
}

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

function parseDate(dateString) {
  var parts = dateString.split("-");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based
  var year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

function isFirstDateGreater(dateString1, dateString2) {
  var date1 = parseDate(dateString1);
  var date2 = parseDate(dateString2);
  return date1 > date2;
}
