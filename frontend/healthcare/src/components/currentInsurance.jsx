import React from "react";
import useGetInsurance from "../hooks/useGetInsurance";

const CurrentInsurance = () => {
  const { loading, insurance } = useGetInsurance();
  console.log(insurance);
  const InsuranceRow = ({ ins }) => {
    return (
      <tr>
        {/* <td className="text-left">{ins.doctorId.fullName}</td> */}
        <td className="text-left">{ins.startDate}</td>
        {/* <td className="text-left">{ins.time}</td>
        <td className="text-left">{ins.description}</td>
        <td className="text-left">{ins.status}</td> */}
      </tr>
    );
  };
  return (
    <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
      <p className="text-xl">Current Insurance</p>
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
            {insurance.map((ins) => (
              <InsuranceRow key={ins.id} ins={ins} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrentInsurance;
