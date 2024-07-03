import React from "react";
import useGetPlansComp from "../hooks/useGetPlansComp";

const GetPlans = () => {
  const { loading, plansComp } = useGetPlansComp();

  return (
    <div className="p-5 bg-zinc-900  min-h-screen text-white">
      <div className="relative flex mb-2">
        <div>Username</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div><div className="flex mt-2">
      <div className="rounded-md mr-3 p-2  min-h-screen  bg-blue-500 flex flex-col">
        <a href="/addplans">Add Plans</a>
        <a href="/getplans">Get Plans</a>
        <a href="/approvedinsurance">Approved Insurances</a>
        <a href="/claimrequest">Claim Request</a>
        <a href="/pendingrequestcomp">Pending Request</a>
      </div>
      <div
      className="w-1/2 bg-blue-300 min-h-screen rounded-lg p-1 text-black"
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
      )}</div>
    </div>
    </div>
  );
};

export default GetPlans;
