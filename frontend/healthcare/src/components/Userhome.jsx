import React from "react";
import { useState } from "react";

import ScheduleAppt from "./scheduleAppt";
import CurrentAppts from "./currentAppts";

import ApplyInsurance from "./ApplyInsurance";
import CurrentInsurance from "./currentInsurance";

const Userhome = () => {
  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex">
        <div>Username</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div>
      <div className="flex gap-4 h-1/2">
        <CurrentAppts />
        <CurrentInsurance />
      </div>
      <div className="flex gap-4 h-1/2 mt-5">
        <ScheduleAppt />
        <ApplyInsurance />
      </div>
    </div>
  );
};

export default Userhome;
