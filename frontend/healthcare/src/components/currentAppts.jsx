import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useGetAppts from "../hooks/useGetAppts";
import MessageContainer from "./MessageContainer";
import useConversation from "../../zustand/useConversation";
import { AuthContext } from "../context/AuthContext";
import image from "../assets/bg.webp";
import useLogoutUser from "../hooks/useLogoutUser";

const CurrentAppts = () => {
  const { loading, appts } = useGetAppts();
  const { setSelectedConversation } = useConversation();
  const [selectedAppt, setSelectedAppt] = useState(null);
  const { authUser } = useContext(AuthContext);
  const { logout } = useLogoutUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const AppointmentRow = ({ appt }) => {
    const handleChatClick = () => {
      setSelectedConversation(appt.doctorId);
      setSelectedAppt(appt);
    };

    return (
      <tr>
        <td className="border-2 text-left">{appt.doctorId.fullName}</td>
        <td className="border-2 text-left">{appt.date}</td>
        <td className="border-2 text-left">{appt.time}</td>
        <td className="border-2 text-left">{appt.description}</td>
        <td className="border-2 text-left">{appt.status}</td>
        <td className="border-2 text-left">
          <button onClick={handleChatClick}>Chat</button>
        </td>
      </tr>
    );
  };

  return (
    <div
      className="p-5 bg-zinc-900 w-full min-h-screen text-white"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      {/* Flex container for main content and message container */}
      <div className="flex justify-between items-start">
        {/* Main content */}
        <div className="flex flex-col w-3/5">
          <div className="relative flex mb-2">
            <div>{authUser ? authUser.fullName : "Username"}</div>
            <button className="absolute right-0" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="flex mt-2">
            <div className="rounded-md mr-3 p-2 h-[calc(100vh-60px)] bg-blue-500 flex flex-col">
              <a href="/currentappt">Current Appointment</a>
              <a href="/currentinsurance">Current Insurance</a>
              <a href="/scheduleappt">Schedule Appointment</a>
              <a href="/applyinsurance">Apply for Insurance</a>
            </div>
            <div className="w-full bg-blue-300 h-full rounded-lg p-1 text-black overflow-auto">
              <p className="text-xl">Current Appointment</p>
              {loading ? (
                <p>Loading appointments...</p>
              ) : (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="border-2 text-left">Doctor's Name</th>
                      <th className="border-2 text-left">Date</th>
                      <th className="border-2 text-left">Time</th>
                      <th className="border-2 text-left">Description</th>
                      <th className="border-2 text-left">Status</th>
                      <th className="border-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appts.map((appt) => (
                      <AppointmentRow key={appt.id} appt={appt} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        {/* Message container */}
        {selectedAppt && (
          <div
            className="w-2/5 h-3/4 p-5 bg-zinc-800 text-black rounded-lg overflow-hidden shadow-lg"
            style={{ marginLeft: "5%" }}
          >
            <MessageContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentAppts;
