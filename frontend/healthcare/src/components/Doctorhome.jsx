import React from "react";
import UpcomingApptDoc from "./UpcomingApptDoc";
import PendingReqDoc from "./PendingReqDoc";
import PreviousReq from "./PreviousReq";

const Doctorhome = () => {
  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex">
        <div>Dr. name</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div>
      <div className="flex gap-4 h-1/2">
        <PendingReqDoc />
        <UpcomingApptDoc />
      </div>
      <PreviousReq />
    </div>
  );
};

export default Doctorhome;
