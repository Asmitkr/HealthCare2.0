import React from "react";
import useUpcomingApptDoc from "../hooks/useUpcomingApptDoc";

const UpcomingApptDoc = () => {
  const { loading, upcomingAppts } = useUpcomingApptDoc();
  const hasUpcomingAppts =
    Array.isArray(upcomingAppts) && upcomingAppts.length > 0;

  return (
    <div className="mt-2 w-1/2 bg-blue-700 h-full rounded-lg p-4 text-black overflow-auto">
      <p className="text-xl mb-4">Upcoming Appointments</p>
      {loading ? (
        <p>Loading...</p>
      ) : hasUpcomingAppts ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Patient Name</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Description</th>
                <th className="text-left p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppts.map((appt) => (
                <tr key={appt.id}>
                  <td className="p-2">{appt.patientId.fullName}</td>
                  <td className="p-2">{appt.date}</td>
                  <td className="p-2">{appt.time}</td>
                  <td className="p-2">{appt.description}</td>
                  <td className="p-2">{appt.patientId.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

export default UpcomingApptDoc;
