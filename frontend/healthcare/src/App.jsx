import { useState } from "react";
import "./index.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Signup_user from "./components/Signup_user";
import Signup_dr from "./components/Signup_dr";
import Signup_comp from "./components/Signup_comp";
import Userhome from "./components/Userhome";
import Doctorhome from "./components/Doctorhome";
import Companyhome from "./components/Companyhome";
import CurrentAppts from "./components/currentAppts";
import CurrentInsurance from "./components/currentInsurance";
import ApplyInsurance from "./components/ApplyInsurance";
import AddPlans from "./components/Plans";
import GetPlans from "./components/GetPlans";
import ApprovedInsuranceCompany from "./components/ApprovedInsuranceCompany";
import ScheduleAppt from "./components/scheduleAppt";
import ClaimRequestsComp from "./components/ClaimRequestsComp";
import PendingRequestComp from "./components/PendingRequestComp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup_user" element={<Signup_user />} />
        <Route path="/signup_dr" element={<Signup_dr />} />
        <Route path="/signup_comp" element={<Signup_comp />} />
        <Route path="/userhome" element={<Userhome />} />
        <Route path="/doctorhome" element={<Doctorhome />} />
        <Route path="/companyhome" element={<Companyhome />} />
        <Route path="/currentappt" element={<CurrentAppts />} />
        <Route path="/currentinsurance" element={<CurrentInsurance />} />
        <Route path="/applyinsurance" element={<ApplyInsurance />} />
        <Route path="/scheduleappt" element={<ScheduleAppt />} />
        <Route path="/addplans" element={<AddPlans />} />
        <Route path="/getplans" element={<GetPlans />} />
        <Route path="/approvedinsurance" element={<ApprovedInsuranceCompany />} />
        <Route path="/claimrequest" element={<ClaimRequestsComp />} />
        <Route path="/pendingrequestcomp" element={<PendingRequestComp />} />
      </Routes>
      <ToastContainer position="top-center" />
      <Toaster />
    </>
  );
}

export default App;
