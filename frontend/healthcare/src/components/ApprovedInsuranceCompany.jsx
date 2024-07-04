import React from "react";
import useGetApprovedInsuComp from "../hooks/useGetApprovedInsuComp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import image from "../assets/bg.webp";
import useLogoutComp from "../hooks/useLogoutComp";

const ApprovedInsuranceCompany = () => {
  const { loading, approvedInsu } = useGetApprovedInsuComp();
  const { authUser } = useContext(AuthContext);
  const { logout } = useLogoutComp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="p-5 bg-zinc-900 w-full min-h-screen text-white"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      <div className="relative flex mb-2">
        <div>{authUser ? authUser.fullName : "Username"}</div>
        <button className="absolute right-0" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex mt-2">
        <div className="rounded-md mr-3 p-2 min-h-screen  bg-blue-500 flex flex-col">
          <a href="/addplans">Add Plans</a>
          <a href="/getplans">Get Plans</a>
          <a href="/approvedinsurance">Approved Insurances</a>
          <a href="/claimrequest">Claim Request</a>
          <a href="/pendingrequestcomp">Pending Request</a>
        </div>
        <div className=" w-1/2 bg-blue-300 rounded-lg p-1 text-black">
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
      </div>
    </div>
  );
};

export default ApprovedInsuranceCompany;
