import mongoose from "mongoose"

const AppointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected","Not Replied"],
        default: 'Pending'
    },
    description: {
        type: String,
        required:true
    }
  
} , {timestamps: true });


const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;