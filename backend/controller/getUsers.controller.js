import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";

export const getUsers = async (req, res) => {
  try {
    const doctorId = req.doctor._id;
    const appointments = await Appointment.find({doctorId}).populate("patientId");
   // const users = await User.find({}).select("-password");
    // console.log(users);
    const patients = appointments.map(appointment => appointment.patientId);
    const uniquePatients = Array.from(new Set(patients.map(patient => patient._id.toString())))
                                .map(id => patients.find(patient => patient._id.toString() === id));

    res.status(200).json(uniquePatients);
  } catch (error) {
    console.log("Error in getuser: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
