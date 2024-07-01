import React from "react";
import useGetPlansComp from "../hooks/useGetPlansComp";

const GetPlans = () => {
  const { loading, plansComp } = useGetPlansComp();

  return (
    <div
      className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      <p className="text-xl mb-2">Available Plans</p>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(plansComp) && plansComp.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-2 text-left font-bold text-black">
                Plan id
              </th>
              <th className="px-6 py-2 text-left font-bold text-black">
                Description
              </th>
              <th className="px-6 py-2 text-left font-bold text-black">
                Duration
              </th>
              <th className="px-6 py-2 text-left font-bold text-black">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {plansComp.map((plan, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{plan._id}</td>
                <td className="px-6 py-4">{plan.type}</td>
                <td className="px-6 py-4">{plan.duration}</td>
                <td className="px-6 py-4">{plan.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No plans available.</p>
      )}
    </div>
  );
};

export default GetPlans;
