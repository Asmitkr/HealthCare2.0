import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "User",
  },
  companyid: {
    type: String,
    required: true,
    trim: true,
  },
  planid: {
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
    min: 1,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  claimRequest: {
    type: String,
    enum: ["Applied", "Not Applied", "Approved", "Rejected"],
    default: "Not Applied",
  },
  Desc: {
    type: String,
    trim: true,
  },
});

const Insurance = mongoose.model("Insurance", insuranceSchema);

export default Insurance;
