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
      companyname:req.company.fullName,
      companyid: req.company._id,
      duration,
      amount,
    });

    if (newinsurancePlan) {
      await newinsurancePlan.save();

      res.status(201).json({
        _id: newinsurancePlan._id,
        company:req.company.fullName,
        amount: newinsurancePlan.amount,
        duration: newinsurancePlan.duration,
      });
    } else {
      res.status(400).json({ error: "Invalid Plan Data" });
    }
  } catch (error) {
    console.log("Error in Add plan controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SearchPlan = async (req, res) => {
  try {
    if (!req.user && !req.company) {
      return res.status(400).json({ error: "Not Valid User" });
    }
    const { companyid } = req.body;

    if (companyid) {
      const Plans = await InsurancePlans.find({ companyid: companyid });
      if (!Plans) {
        res.status(404).json({ message: "No plan data for this company" });
      } else {
        res.status(201).json(Plans);
      }
    } else {
      const Plans = await InsurancePlans.find();
      if (!Plans) {
        res.status(404).json({ message: "No plan data available" });
      } else {
        res.status(201).json(Plans);
      }
    }
  } catch (error) {
    console.log("Error in Add plan controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
