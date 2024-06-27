import Company from "../models/company.model.js";

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}).select("-password");
    console.log(companies);

    res.status(200).json(companies);
  } catch (error) {
    console.log("Error in getCompanies: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
