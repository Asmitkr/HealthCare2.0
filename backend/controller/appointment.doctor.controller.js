import Appointment from "../models/appointment.model.js";

export const PendingRequest = async(req,res) => {
    try{
        const doctorId = req.doctor._id;

        const pendingRequests = await Appointment.find({doctorId:doctorId,status: "Pending"}).populate("patientId");
        if(!pendingRequests) {
            return res.status(200).json({message:"No Pending request Found"})
        }
        const validRequests = pendingRequests.filter(request => compareDateTime(request.date, request.time));

        if (validRequests.length === 0) {
            return res.status(200).json({ message: "No valid pending requests found" });
        }

        res.status(200).json(validRequests);


    }
    catch(error){
        console.log("Error in Pending request", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const ReplyAppointment = async(req,res) =>{
    try{
        const {appointmentId,status} = req.body;
        const validStatuses = ['Approved', 'Rejected'];

        if (!validStatuses.includes(status)) {
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

    }catch(error){
        console.log("Error in reply appointment", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const UpcomingAppointment = async(req,res) => {
    try{
        const doctorId = req.doctor._id;

        const appointment = await Appointment.find({doctorId:doctorId,status: "Approved"}).populate("patientId");
        if(!appointment) {
            return res.status(200).json({message:"No Appintment  Found"})
        }
        const upcomingAppointment = appointment.filter(request => compareDateTime(request.date, request.time));

        if (upcomingAppointment.length === 0) {
            return res.status(200).json({ message: "No appointment found" });
        }

        res.status(200).json(upcomingAppointment);


    }
    catch(error){
        console.log("Error in Upcoming appointment", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const PreviousAppointment = async(req,res) => {
    try{
        const doctorId = req.doctor._id;

        const {patientId} = req.query;

        const appointment = await Appointment.find({doctorId:doctorId,patientId:patientId}).populate("patientId");
        if(!appointment) {
            return res.status(200).json({message:"No Appintment  With this User"})
        }
        const previousAppointments = appointment.filter(request => !compareDateTime(request.date, request.time));

        if (previousAppointments.length === 0) {
            return res.status(200).json({ message: "No Previous appointment with this user" });
        }

        res.status(200).json(previousAppointments);


    }
    catch(error){
        console.log("Error in Previous appointment", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



function compareDateTime(dateString, timeString) {
    // Parse the date string
    const [day, month, year] = dateString.split('-').map(Number);
    // Parse the time string
    const [hours, minutes] = timeString.split(':').map(Number);

    // Combine date and time into a single Date object in UTC
    const dateTime = new Date(Date.UTC(year, month - 1, day, hours - 5, minutes - 30));

    // Get the current date and time in IST (UTC+5:30)
    const now = new Date();
    const nowIST = new Date(now.getTime() + (330 * 60 * 1000)); // IST is UTC + 5:30 (330 minutes)

    // Compare the two dates
    if (dateTime > nowIST) {
        return true;
    } else {
        return false;
    } 
}