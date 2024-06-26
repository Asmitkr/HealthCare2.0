import Doctor from "../models/doctor.model.js";

export const getDoctors = async (req, res) => {
  try {
    // Extract search parameters from query
    const { name, email, type } = req.query;
    let queryObject = {};

    // Build query object based on available parameters
    if (name) {
      queryObject.fullName = { $regex: name, $options: "i" }; // Case-insensitive search
    }
    if (email) {
      queryObject.email = { $regex: email, $options: "i" }; // Case-insensitive search
    }
    if (type) {
      queryObject.type = type;
    }

    // Perform search operation with constructed query object
    const doctors = await Doctor.find(queryObject).select("-password"); // Exclude password from the results
    console.log(doctors);

    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error in getDoctors: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
