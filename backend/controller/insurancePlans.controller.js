import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import InsurancePlans from "../models/insurancePlans.model.js";
import mongoose from "mongoose";

export const AddPlan = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(400).json({ error: "Not Valid Company" });
    }
    const { duration, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: "Amount is not valid" });
    }

    const newinsurancePlan = new InsurancePlans({
      companyname: req.company.fullName,
      companyid: req.company._id,
      duration,
      amount,
    });

    if (newinsurancePlan) {
      await newinsurancePlan.save();

      res.status(201).json({
        _id: newinsurancePlan._id,
        company: req.company.fullName,
        amount: newinsurancePlan.amount,
        duration: newinsurancePlan.duration,
      });
    } else {
      res.status(400).json({ error: "Invalid Plan Data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SearchPlan = async (req, res) => {
  try {
    // Assuming req.user.companyid holds the company ID of the logged-in user
    // console.log(req.company._id);
    const companyid = req.company._id;

    if (!companyid) {
      return res.status(400).json({ error: "Not Valid User or Company" });
    }

    const Plans = await InsurancePlans.find({ companyid: companyid });

    if (!Plans || Plans.length === 0) {
      return res.status(404).json({ message: "No plan data for this company" });
    } else {
      return res.status(200).json(Plans);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
