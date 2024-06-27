import Appointment from "../models/appointment.model.js";

export const ScheduleAppointment = async (req, res) => {
    try {
        const patientId = req.user._id;
        const { doctorId, date, time, description } = req.body;

        if (!isValidDate(date)) {
            return res.status(400).json({ error: "Not valid date" });
        }
        if (!isValidTime(time)) {
            return res.status(400).json({ error: "Not valid time" });
        }

        const existingAppointments = await Appointment.find({ patientId: patientId, doctorId: doctorId });

        if (existingAppointments.length != 0) {
            return res.status(400).json({ error: "Appointment with this doctor already exists" });
        }

        const newAppointment = new Appointment({ patientId, doctorId, date, time, description });
        
        if (newAppointment) {
            await newAppointment.save();
            return res.status(200).json({
                message: "Appointment scheduled successfully",
                _id: newAppointment._id,
                date: newAppointment.date,
                time: newAppointment.time,
                description: newAppointment.description
            });
        } else {
            return res.status(400).json({ error: "Invalid Data provided" });
        }
    } catch (error) {
        console.log("Error in schedule appointment", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const CurrentAppointments = async(req,res)=>{
    try{
        const patientId  = req.user._id;
        const appointments = await Appointment.find({patientId:patientId}).populate('doctorId');
        if(!appointments){
            return res.status(400).json({mesaage:"No appointment found"})
        }
        return res.status(200).json(appointments);

    }
    catch(error){
        console.log("Error in get appointment", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};

function isValidDate(dateString) {
    var regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    var match = regex.exec(dateString);
    if (!match) {
        return false;
    }

    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);

    if (year < 1000 || year > 3000 || month <= 0 || month > 12) {
        return false;
    }

    var monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLengths[1] = 29;
    }
    return day > 0 && day <= monthLengths[month - 1];
}

function isValidTime(time) {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormat.test(time);
}
