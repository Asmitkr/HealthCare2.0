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
        if(!compareDateTime(date,time)){
            return res.status(400).json({ error: "Not valid date and time" });
        }

        if(!isDateWithinThreeDays(date)){
            return res.status(400).json({ error: "Date should be within three days" });
        }
        const existingAppointments = await Appointment.find({ patientId: patientId, doctorId: doctorId });
        if (existingAppointments.length !== 0) {
            const hasValidAppointment = existingAppointments.some(appointment =>
                compareDateTime(appointment.date, appointment.time)
            );
        
            if (hasValidAppointment) {
                return res.status(400).json({ error: "Appointment with this doctor already exists" });
            }
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
        let appointments = await Appointment.find({patientId:patientId}).populate('doctorId');
        if(!appointments){
            return res.status(400).json({mesaage:"No appointment found"})
        }
        const appointmentsToUpdate = appointments.filter(appointment => !compareDateTime(appointment.date, appointment.time)&&appointment.status === "Pending");


        appointments.sort((a, b) => {
            const dateA = new Date(`${a.date.split("-").reverse().join("-")}T${a.time}`);
            const dateB = new Date(`${b.date.split("-").reverse().join("-")}T${b.time}`);
            return dateA - dateB;
          });
          
        if (appointmentsToUpdate.length === 0) {
            return res.status(200).json(appointments);
        }

        // Update the status of past or current appointments to 'not_required'
        const updatePromises = appointmentsToUpdate.map(appointment => {
            appointment.status = 'Not Replied';
            return appointment.save();
        });

        await Promise.all(updatePromises);

        appointments = await Appointment.find({ patientId }).populate('doctorId');

        appointments.sort((a, b) => {
            const dateA = new Date(`${a.date.split("-").reverse().join("-")}T${a.time}`);
            const dateB = new Date(`${b.date.split("-").reverse().join("-")}T${b.time}`);
            return dateA - dateB;
          });

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




function compareDateTime(dateString, timeString) {
    // Parse the date string
    const [day, month, year] = dateString.split('-').map(Number);
    // Parse the time string
    const [hours, minutes] = timeString.split(':').map(Number);

    // Combine date and time into a single Date object in UTC
    const dateTime = new Date(year, month - 1, day, hours, minutes);

    // Get the current date and time in IST
    const now = new Date();// IST is UTC + 5:30 (330 minutes)

    // Compare the two dates
    if (dateTime > now) {
        return true;
    } else {
        return false;
    } 
}

const isDateWithinThreeDays = (enteredDateStr) => {
    // Parse the entered date (assuming it is in "dd-mm-yyyy" format)
    const [day, month, year] = enteredDateStr.split('-').map(Number);
    const enteredDate = new Date(year, month - 1, day);
  
    // Get the current date in IST
    const now = new Date();
    const currentDateIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    
    // Set hours, minutes, seconds, and milliseconds to 0 for an accurate comparison
    currentDateIST.setHours(0, 0, 0, 0);
  
    // Get the date 3 days from now in IST
    const threeDaysFromNow = new Date(currentDateIST);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  
    // Compare the entered date with the current date and the date 3 days from now
    return enteredDate >= currentDateIST && enteredDate <= threeDaysFromNow;
  };
  
  // Example usage:
  //console.log(isDateWithinThreeDays("30-06-2024")); // Adjust the date to test
  