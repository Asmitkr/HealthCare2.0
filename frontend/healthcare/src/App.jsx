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
      </Routes>
      <ToastContainer position="top-center" />
      <Toaster />
    </>
  );
}

export default App;
