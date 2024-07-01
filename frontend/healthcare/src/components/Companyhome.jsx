import React, { useState } from "react";
import { IoSearchSharp, IoCloseSharp } from "react-icons/io5";
import ApprovedInsuranceCompany from "./ApprovedInsuranceCompany";
import PendingRequestComp from "./PendingRequestComp";
import GetPlans from "./GetPlans";

const Companyhome = () => {
  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex">
        <div>Company name</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div>
      <div className="flex gap-4 h-1/2">
        <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
          <p className="text-xl mb-2">Add Plans</p>
          <textarea
            placeholder="Write the plan"
            className="bg-transparent border-2 w-full placeholder:text-zinc-900"
            name=""
            id=""
          ></textarea>
          <div className="flex justify-end">
            <button className="bg-blue-900 text-white p-1 rounded-md w-1/3">
              Add
            </button>
          </div>
        </div>
        <GetPlans />
      </div>
      <div className="flex gap-4 h-1/2">
        <div className="w-1/2">
          <ApprovedInsuranceCompany />
          <div className="mt-2 w-full bg-blue-300 rounded-lg p-1 text-black">
            <p className="text-xl mb-2">Claim Requests</p>
            <div className="mb-2">
              <div className="flex">
                <p className="w-1/2">Request 1</p>
              </div>
              <div>
                <textarea
                  className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
                  placeholder="Type your reply..."
                />
                <div className="flex justify-end">
                  <button className="bg-blue-900 text-white p-1 rounded-md w-1/3">
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex">
                <p className="w-1/2">Request 2</p>
              </div>
              <div>
                <textarea
                  className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
                  placeholder="Type your reply..."
                />
                <div className="flex justify-end">
                  <button className="bg-blue-900 text-white p-1 rounded-md w-1/3">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PendingRequestComp />
      </div>
    </div>
  );
};

export default Companyhome;
