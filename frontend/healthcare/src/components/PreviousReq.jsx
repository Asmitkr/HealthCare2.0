import React, { useState, useEffect } from "react";
import useUserInfo from "../../zustand/useUserInfo";
import useGetUsers from "../hooks/useGetUsers";
import useGetPrevAppt from "../hooks/useGetPreviousAppts";

const PreviousReq = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const { users, loading } = useGetUsers();
  const { setSearchResults } = useUserInfo();
  const { prevAppt, getPrevAppt } = useGetPrevAppt();
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [loadingPrevAppts, setLoadingPrevAppts] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() !== "" && !selectedPatientId) {
      const results = users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      );
      setFilteredUsers(results);
      setSearchResults(results);
    } else {
      setFilteredUsers([]);
      setSearchResults([]);
    }
  }, [searchTerm, users, setSearchResults, selectedPatientId]);

  useEffect(() => {
    if (selectedPatientId && prevAppt.length > 0) {
      const sorted = prevAppt.sort(
        (a, b) =>
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
      );
      setSortedAppointments(sorted);
    }
  }, [prevAppt, selectedPatientId]);

  useEffect(() => {
    setSortedAppointments([]);
    if (getPrevAppt && selectedPatientId) {
      getPrevAppt(selectedPatientId).catch(console.error);
    }
  }, [selectedPatientId, getPrevAppt]);

  const handleFullNameClick = (patientId, patientName) => {
    setSelectedPatientId(patientId);
    setSelectedPatientName(patientName);
    setSearchTerm(patientName);
    setFilteredUsers([]);
    setSortedAppointments([]);
    setLoadingPrevAppts(true);
    if (getPrevAppt) {
      getPrevAppt(patientId)
        .then(() => setLoadingPrevAppts(false))
        .catch((error) => {
          console.error(error);
          setLoadingPrevAppts(false);
        });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedPatientId(null);
    setSelectedPatientName("");
  };

  return (
    <div className="flex items-center justify-center h-1/2 w-full">
      <div className="mt-4 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
        <p className="text-xl">Previous Appointments</p>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 w-full rounded"
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredUsers.length > 0 && !selectedPatientId ? (
          filteredUsers.map((user, index) => (
            <div key={index} className="border-b border-white py-2">
              <button
                onClick={() => handleFullNameClick(user._id, user.fullName)}
                className="text-left font-bold"
              >
                Full Name: {user.fullName}
              </button>
              <p>Age: {user.age}</p>
              <p>Phone: {user.phone}</p>
              <p>Address: {user.address}</p>
            </div>
          ))
        ) : !selectedPatientId ? (
          <p>No users found.</p>
        ) : null}
      </div>
      {selectedPatientId && (
        <div className="mt-4 w-3/4 bg-blue-300 h-full rounded-lg p-4 text-black">
          {loadingPrevAppts ? (
            <p className="text-xl">Loading previous appointments...</p>
          ) : sortedAppointments.length > 0 ? (
            <>
              <p className="text-xl mb-4">
                Appointment Details of {selectedPatientName}
              </p>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAppointments.map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>{appt.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-xl">
              No Previous Appointments Found for {selectedPatientName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviousReq;
