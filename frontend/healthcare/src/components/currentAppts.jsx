import React from "react";
import useGetAppts from "../hooks/useGetAppts";

const CurrentAppts = () => {
  const { loading, appts } = useGetAppts();
  const AppointmentRow = ({ appt }) => {
    return (
      <tr>
        <td className="text-left">{appt.doctorId.fullName}</td>
        <td className="text-left">{appt.date}</td>
        <td className="text-left">{appt.time}</td>
        <td className="text-left">{appt.description}</td>
        <td className="text-left">{appt.status}</td>
      </tr>
    );
  };
  return (
    <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
      <p className="text-xl">Current Appointment</p>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Doctor's Name</th>
              <th className="text-left">Date</th>
              <th className="text-left">Time</th>
              <th className="text-left">Description</th>
              <th className="text-left">Status</th>
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
  );
};

export default CurrentAppts;
