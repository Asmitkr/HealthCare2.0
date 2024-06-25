import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    trim: true,
  },
  companyid: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min:0,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  claimRequest:{
    type:String,
    enum:["Applied","Not Applied","Approved","Rejected"],
    default:"Not Applied",
  },
  claim:{
    type:String,
    enum:["Claimed","Not Claimed"],
    default:"Not Claimed",
  }
});

const Insurance = mongoose.model("Insurance", insuranceSchema);

export default Insurance;
