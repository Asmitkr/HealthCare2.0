import React, { useState, useEffect } from "react";
import useGetPendingReq from "../hooks/useGetPendingReq";
import useReplyAppt from "../hooks/useReplyAppt";

const PendingReqDoc = () => {
  const { loading: loadingPendingReq, pendingReq: fetchedPendingReq } =
    useGetPendingReq();
  const { loading: loadingReply, replyAppt } = useReplyAppt();
  const [pendingReq, setPendingReq] = useState([]);

  useEffect(() => {
    setPendingReq(fetchedPendingReq);
  }, [fetchedPendingReq]);

  const handleReply = async (appointmentId, status) => {
    await replyAppt({ appointmentId, status });
    // Remove the replied request from the pendingReq state
    setPendingReq((currentPendingReq) =>
      currentPendingReq.filter((req) => req._id !== appointmentId)
    );
  };

  const isPendingReqArray = Array.isArray(pendingReq);

  return (
    <div className="mt-2 w-1/2 bg-blue-700 h-full rounded-lg p-1 text-black">
      <p className="text-xl">Pending Requests</p>
      {loadingPendingReq ? (
        <p>Loading...</p>
      ) : isPendingReqArray && pendingReq.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Date</th>
              <th className="text-left">Time</th>
              <th className="text-left">Description</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingReq.map((request, index) => (
              <tr key={index} className="border-b">
                <td>{request.patientId.fullName}</td>
                <td>{request.date}</td>
                <td>{request.time}</td>
                <td>{request.description}</td>
                <td>{request.patientId.phone}</td>
                <td>
                  <button
                    className="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                    onClick={() => handleReply(request._id, "Approved")}
                    disabled={loadingReply}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                    onClick={() => handleReply(request._id, "Rejected")}
                    disabled={loadingReply}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests</p>
      )}
    </div>
  );
};

export default PendingReqDoc;
