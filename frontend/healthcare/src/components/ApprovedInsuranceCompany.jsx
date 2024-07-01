import React from "react";
import useGetApprovedInsuComp from "../hooks/useGetApprovedInsuComp";

const ApprovedInsuranceCompany = () => {
  const { loading, approvedInsu } = useGetApprovedInsuComp();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-2 w-full bg-blue-300 rounded-lg p-1 text-black">
      <p className="text-xl mb-2">Approved Insurances</p>
      {approvedInsu.length > 0 ? (
        <div className="overflow-auto">
          <table className="w-full table-auto min-w-max">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Plan ID</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Claim Request</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedInsu.map((insu, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{insu.planid}</td>
                  <td className="px-4 py-2">{insu.username}</td>
                  <td className="px-4 py-2">{insu.phone}</td>
                  <td className="px-4 py-2">{insu.email}</td>
                  <td className="px-4 py-2">{insu.startDate}</td>
                  <td className="px-4 py-2">{insu.endDate}</td>
                  <td className="px-4 py-2">{insu.claimRequest}</td>
                  <td className="px-4 py-2">{insu.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No approved insurances found.</p>
      )}
    </div>
  );
};

export default ApprovedInsuranceCompany;
