import React, { useState } from "react";
import UpcomingApptDoc from "./UpcomingApptDoc";
import PendingReqDoc from "./PendingReqDoc";
import PreviousReq from "./PreviousReq";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Doctorhome = () => {
  const [currentView, setCurrentView] = useState("PendingRequests");
  const { authUser } = useContext(AuthContext);
  return (
    <div
      className="p-5 w-full min-h-screen text-white flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/featured/healthcare-oco8w27tkw40cp90.jpg')`,
      }}
    >
      <div className="relative flex mb-4">
        <div>{authUser ? authUser.fullName : "Username"}</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div>
      <div className="flex flex-1 gap-4">
        {/* Left side with buttons */}
        <div className="flex flex-col gap-4 h-full bg-blue-700 p-4 rounded-lg">
          <button
            onClick={() => setCurrentView("PendingRequests")}
            className={`p-4 flex-1 ${
              currentView === "PendingRequests" ? "bg-blue-500" : "bg-blue-700"
            } text-left text-white`}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setCurrentView("UpcomingAppointments")}
            className={`p-4 flex-1 ${
              currentView === "UpcomingAppointments"
                ? "bg-blue-500"
                : "bg-blue-700"
            } text-left text-white`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setCurrentView("PreviousRequests")}
            className={`p-4 flex-1 ${
              currentView === "PreviousRequests" ? "bg-blue-500" : "bg-blue-700"
            } text-left text-white`}
          >
            Previous Requests
          </button>
        </div>
        {/* Right side with content */}
        <div className="flex-1 flex justify-center items-center">
          {currentView === "PendingRequests" && <PendingReqDoc />}
          {currentView === "UpcomingAppointments" && <UpcomingApptDoc />}
          {currentView === "PreviousRequests" && <PreviousReq />}
        </div>
      </div>
    </div>
  );
};

export default Doctorhome;
