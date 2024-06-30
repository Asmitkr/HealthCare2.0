import insurancePlan from "../models/insurancePlans.model.js";

export const getInsurancePlans = async (req, res) => {
  try {
    const insurancePlans = await insurancePlan.find({});
    // console.log(insurancePlans);

    res.status(200).json(insurancePlans);
  } catch (error) {
    console.log("Error in getinsurancePlans: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
