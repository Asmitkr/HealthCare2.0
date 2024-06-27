import mongoose from "mongoose";

const insuranceplanSchema = new mongoose.Schema({
  companyid: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    default: "insurance needed",
  },
});

const insurancePlans = mongoose.model("InsurancePlans", insuranceplanSchema);

export default insurancePlans;
