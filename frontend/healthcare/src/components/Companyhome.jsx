import React from "react";
import ApprovedInsuranceCompany from "./ApprovedInsuranceCompany";
import PendingRequestComp from "./PendingRequestComp";
import Plans from "./Plans";
import ClaimRequestsComp from "./ClaimRequestsComp";

const Companyhome = () => {
  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex">
        <div>Company name</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div>
      <Plans />
      <div className="flex gap-4 h-1/2">
        <div className="w-1/2">
          <ApprovedInsuranceCompany />
          <ClaimRequestsComp />
        </div>
        <PendingRequestComp />
      </div>
    </div>
  );
};

export default Companyhome;
