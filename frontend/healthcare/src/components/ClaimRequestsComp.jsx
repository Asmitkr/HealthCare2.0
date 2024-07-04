import React from "react";
import useGetClaims from "../hooks/useGetClaims";
import useReplyClaim from "../hooks/useReplyClaim";
import { useState, useEffect } from "react";
import image from "../assets/bg.webp";

const ClaimRequestsComp = () => {
  const { loading: claimsLoading, claims: fetchedClaims } = useGetClaims();
  const [claims, setClaims] = useState([]);
  const { replyClaim, loading: replyLoading } = useReplyClaim();

  useEffect(() => {
    setClaims(fetchedClaims);
  }, [fetchedClaims]);

  const handleReply = async (_id, claimReply) => {
    await replyClaim({ _id, claimReply });
    toast.success(`Claim ${claimReply.toLowerCase()}`);
    setClaims((currentClaims) =>
      currentClaims.filter((claim) => claim._id !== _id)
    );
  };

  return (
    <div className="p-5 bg-zinc-900  min-h-screen text-white"
    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
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
      <div className="w-1/2 bg-blue-300 rounded-lg p-1 text-black overflow-x-auto">
      <p className="text-xl mb-2">Claim Requests</p>
      {claimsLoading ? (
        <p>Loading claims...</p>
      ) : Array.isArray(claims) && claims.length > 0 ? (
        <table className="w-full min-w-max">
          <thead>
            <tr>
              <th className="text-left px-4">Insurance ID</th>
              <th className="text-left px-4">Full Name</th>
              <th className="text-left px-4">Phone</th>
              <th className="text-left px-4">Amount</th>
              <th className="text-left px-4">Start Date</th>
              <th className="text-left px-4">End Date</th>
              <th className="text-left px-4">Description</th>
              <th className="text-left px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim._id}>
                <td className="px-4">{claim._id}</td>
                <td className="px-4">{claim.userid.fullName}</td>
                <td className="px-4">{claim.userid.phone}</td>
                <td className="px-4">{claim.amount}</td>
                <td className="px-4">{claim.startDate}</td>
                <td className="px-4">{claim.endDate}</td>
                <td className="px-4">{claim.Desc}</td>
                <td className="px-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleReply(claim._id, "Approved")}
                    disabled={replyLoading}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                    onClick={() => handleReply(claim._id, "Rejected")}
                    disabled={replyLoading}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No claims to display.</p>
      )}</div>
    </div>
    </div>
  );
};

export default ClaimRequestsComp;
