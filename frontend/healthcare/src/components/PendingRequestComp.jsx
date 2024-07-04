import React from "react";
import useGetPendingInsu from "../hooks/useGetPendingInsu";
import useReplyInsurance from "../hooks/useReplyInsurance"; // Step 1: Import useReplyInsurance
import image from "../assets/bg.webp";

const PendingRequestComp = () => {
  const { loading: loadingInsu, pendingInsu } = useGetPendingInsu();
  const { replyInsurance } = useReplyInsurance(); // Destructure replyInsurance function

  if (loadingInsu) return <p>Loading...</p>;

  // Function to handle accept
  const handleAccept = async (_id) => {
    await replyInsurance({ _id: _id, status: "Approved" });
  };

  // Function to handle reject
  const handleReject = async (_id) => {
    await replyInsurance({ _id: _id, status: "Rejected" });
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
      <div className="w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
      <p className="text-xl mb-2">Insurance Requests</p>
      {!Array.isArray(pendingInsu) || pendingInsu.length === 0 ? (
        <p>No pending insurance requests.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Age</th>
                <th className="text-left px-4 py-2">Address</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Start Date</th>
                <th className="text-left px-4 py-2">End Date</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Plan id</th>
                <th className="text-right px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingInsu.map((request, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{request.userid.fullName}</td>
                  <td className="px-4 py-2">{request.userid.age}</td>
                  <td className="px-4 py-2">{request.userid.address}</td>
                  <td className="px-4 py-2">{request.userid.phone}</td>
                  <td className="px-4 py-2">{request.userid.email}</td>
                  <td className="px-4 py-2">{request.startDate}</td>
                  <td className="px-4 py-2">{request.endDate}</td>
                  <td className="px-4 py-2">{request.amount}</td>
                  <td className="px-4 py-2">{request.planid}</td>
                  <td className="px-4 py-2 flex justify-end">
                    <button
                      className="bg-green-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                      onClick={() => handleAccept(request._id)} // Call handleAccept with insurance _id
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                      onClick={() => handleReject(request._id)} // Call handleReject with insurance _id
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}</div>
    </div>
    </div>
  );
};

export default PendingRequestComp;
