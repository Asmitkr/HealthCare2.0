import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UpcomingApptDoc from "./UpcomingApptDoc";
import PendingReqDoc from "./PendingReqDoc";
import PreviousReq from "./PreviousReq";
import { AuthContext } from "../context/AuthContext";
import image from "../assets/bg.webp";
import useLogoutDoc from "../hooks/useLogoutDoc";

const Doctorhome = () => {
  const [currentView, setCurrentView] = useState("PendingRequests");
  const { authUser } = useContext(AuthContext);
  const { logout } = useLogoutDoc(); // Destructure logout function from useLogoutDoc hook
  const navigate = useNavigate(); // Call useNavigate to get the navigate function

  const handleLogout = async () => {
    await logout(); // Call logout function
    navigate("/"); // Navigate to home page after logout
  };

  return (
    <div
      className="p-5 w-full min-h-screen text-white flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      <div className="relative flex mb-4">
        <div>{authUser ? authUser.fullName : "Username"}</div>
        <button className="absolute right-0" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex flex-1 gap-4">
        {/* Left side with buttons */}
        <div className="flex flex-col gap-4 h-full bg-blue-500 p-4 rounded-lg">
          <button
            onClick={() => setCurrentView("PendingRequests")}
            className={`p-4 flex-1 rounded ${
              currentView === "PendingRequests" ? "bg-blue-500" : "bg-blue-700"
            } text-left text-white `}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setCurrentView("UpcomingAppointments")}
            className={`p-4 flex-1 rounded ${
              currentView === "UpcomingAppointments"
                ? "bg-blue-500"
                : "bg-blue-700"
            } text-left text-white`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setCurrentView("PreviousRequests")}
            className={`p-4 flex-1 rounded ${
              currentView === "PreviousRequests" ? "bg-blue-500" : "bg-blue-700"
            } text-left text-white`}
          >
            Previous Requests
          </button>
        </div>
        {/* Right side with content */}
        <div className="flex-1 flex text-white">
          {currentView === "PendingRequests" && <PendingReqDoc />}
          {currentView === "UpcomingAppointments" && <UpcomingApptDoc />}
          {currentView === "PreviousRequests" && <PreviousReq />}
        </div>
      </div>
    </div>
  );
};

export default Doctorhome;
