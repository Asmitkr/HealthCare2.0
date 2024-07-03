import React from "react";
import { useState } from "react";
import SearchDoctors from "./SearchDoctors";
import useDoctorInfo from "../../zustand/useDoctorInfo";
import useScheduleAppt from "../hooks/useScheduleAppt";

const ScheduleAppt = () => {
  const { doctorInfo } = useDoctorInfo();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [description, setDescription] = useState("");
  const { loading, scheduleAppt } = useScheduleAppt();

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedDoctor ||
      !appointmentDate ||
      !appointmentTime ||
      !description
    ) {
      alert("Please fill in all fields");
      return;
    }
    const data = {
      doctorId: selectedDoctor._id,
      date: appointmentDate,
      time: appointmentTime,
      description: description,
    };
    console.log(data);
    await scheduleAppt(data);
  };
  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex mb-2">
        <div>Username</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div><div className="flex mt-2">
      <div className="rounded-md p-2 mr-4 min-h-screen  bg-blue-500 flex flex-col">
        <a href="/currentappt">Current Appointment</a>
        <a href="/currentinsurance">Current Insurance</a>
        <a href="/scheduleappt">Schedule Appointment</a>
        <a href="/applyinsurance">Apply for Insurance</a>
      </div>
    <div className="w-1/2 bg-blue-300 min-h-screen rounded-lg p-1 text-black">
      <p className="text-xl mb-2">Schedule Appointment</p>
      <SearchDoctors />
      <div className="mt-2 w-full bg-blue-300 rounded-lg p-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Doctor's Details</h2>
        {doctorInfo && doctorInfo.length > 0 ? (
          <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
            {doctorInfo.map((doctor, index) => (
              <div key={index} className="border-2 p-1 mr-2 space-y-2 mb-4 border-b pb-4">
                <p>
                  <strong>Full Name:</strong> {doctor.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Gender:</strong> {doctor.gender}
                </p>
                <p>
                  <strong>Address:</strong> {doctor.address}
                </p>
                <p>
                  <strong>Age:</strong> {doctor.age}
                </p>
                <p>
                  <strong>Specialization:</strong> {doctor.type}
                </p>
                <p>
                  <strong>Phone:</strong> {doctor.phone}
                </p>
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleSelectDoctor(doctor)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No doctor details available.</p>
        )}
      </div>
      {selectedDoctor && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="p-5 bg-transparent w-full text-white border-2">
              <label htmlFor="datepicker" className="text-zinc-900">
                Select a date:
              </label>
              <input
                type="date"
                id="datepicker"
                className="border-2 mt-2 w-full bg-blue-300 rounded-lg p-1 text-black"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <input
              className="bg-blue-300 mt-2 w-full border-2 p-1 placeholder:text-zinc-900"
              type="text"
              placeholder="Time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
            <textarea
              className="p-2 mt-2 bg-transparent border-2 w-full h-28 placeholder:text-zinc-900"
              placeholder="Give Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </button>
          </form>
        </div>
      )}</div>
      </div>
    </div>
  );
};

export default ScheduleAppt;
