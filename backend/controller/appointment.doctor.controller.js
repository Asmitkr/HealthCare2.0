import Appointment from "../models/appointment.model.js";

export const PendingRequest = async (req, res) => {
  try {
    const doctorId = req.doctor._id;

    const pendingRequests = await Appointment.find({
      doctorId: doctorId,
      status: "Pending",
    }).populate("patientId", "-password");
    if (!pendingRequests) {
      return res.status(200).json({ message: "No Pending request Found" });
    }
    const validRequests = pendingRequests.filter((request) =>
      compareDateTime(request.date, request.time)
    );

    if (validRequests.length === 0) {
      return res
        .status(200)
        .json({ message: "No valid pending requests found" });
    }
    validRequests.sort((a, b) => {
      const dateA = new Date(`${a.date.split("-").reverse().join("-")}T${a.time}`);
      const dateB = new Date(`${b.date.split("-").reverse().join("-")}T${b.time}`);
      return dateA - dateB;
    });

    res.status(200).json(validRequests);
  } catch (error) {
    console.log("Error in Pending request", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const ReplyAppointment = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const validStatuses = ["Approved", "Rejected"];

    // console.log("appointmentId", appointmentId);
    // console.log("status", status);
    if (!validStatuses.includes(status)) {
      // console.log("Invalid status");
      return res.status(400).json({ message: "Invalid status" });
    }
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the appointment status
    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status} successfully` });
  } catch (error) {
    console.log("Error in reply appointment", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpcomingAppointment = async (req, res) => {
  try {
    const doctorId = req.doctor._id;

    const appointment = await Appointment.find({
      doctorId: doctorId,
      status: "Approved",
    }).populate("patientId", "-password");
    if (!appointment) {
      return res.status(200).json({ message: "No Appintment  Found" });
    }
    const upcomingAppointment = appointment.filter((request) =>
      compareDateTime(request.date, request.time)
    );

    if (upcomingAppointment.length === 0) {
      return res.status(200).json({ message: "No appointment found" });
    }
    upcomingAppointment.sort((a, b) => {
      const dateA = new Date(`${a.date.split("-").reverse().join("-")}T${a.time}`);
      const dateB = new Date(`${b.date.split("-").reverse().join("-")}T${b.time}`);
      return dateA - dateB;
    });

    res.status(200).json(upcomingAppointment);
  } catch (error) {
    console.log("Error in Upcoming appointment", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const PreviousAppointment = async (req, res) => {
  try {
    const doctorId = req.doctor._id;

    const { patientId } = req.query;

    let appointment = await Appointment.find({
      doctorId: doctorId,
      patientId: patientId,
    }).populate("patientId");
    if (!appointment) {
      return res.status(200).json({ message: "No Appintment  With this User" });
    }

    let previousAppointments = appointment.filter(
      (request) => !compareDateTime(request.date, request.time)
    );

    if (previousAppointments.length === 0) {
      return res
        .status(200)
        .json({ message: "No Previous appointment with this user" });
    }

    previousAppointments = appointment.filter(
      (request) =>
        !compareDateTime(request.date, request.time) &&
        request.status === "Pending"
    );
    // Update the status of past or current appointments to 'not_required'
    const updatePromises = previousAppointments.map((appointment) => {
      appointment.status = "Not Replied";
      return appointment.save();
    });

    await Promise.all(updatePromises);

    appointment = await Appointment.find({
      doctorId: doctorId,
      patientId: patientId,
    }).populate("patientId");

    previousAppointments = appointment.filter(
      (request) => !compareDateTime(request.date, request.time)
    );

   // console.log("Previous Appointments: ", previousAppointments);
    previousAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date.split("-").reverse().join("-")}T${a.time}`);
      const dateB = new Date(`${b.date.split("-").reverse().join("-")}T${b.time}`);
      return dateA - dateB;
    });

    res.status(200).json(previousAppointments);
  } catch (error) {
    console.log("Error in Previous appointment", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

function compareDateTime(dateString, timeString) {
  // Parse the date string
  const [day, month, year] = dateString.split("-").map(Number);
  // Parse the time string
  const [hours, minutes] = timeString.split(":").map(Number);

  // Combine date and time into a single Date object in UTC
  const dateTime = new Date(year, month - 1, day, hours, minutes);

  // Get the current date and time in IST
  const now = new Date(); // IST is UTC + 5:30 (330 minutes) // IST is UTC + 5:30 (330 minutes)

  // Compare the two dates
  if (dateTime > now) {
    return true;
  } else {
    return false;
  }
}
