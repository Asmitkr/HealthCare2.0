import React from "react";
import GetPlans from "./GetPlans";
import useAddPlans from "../hooks/useAddPlans";
import { useState } from "react";

const AddPlans = () => {
  const { addPlan, loading } = useAddPlans();
  const [planDetails, setPlanDetails] = useState({
    amount: "",
    duration: "",
    description: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Adding...");
    try {
      await addPlan(planDetails);
      setSubmitStatus("Added");
      setPlanDetails({ amount: "", duration: "", description: "" });
      setTimeout(() => setSubmitStatus(""), 2000);
    } catch (error) {
      setSubmitStatus("Failed to add");
      setTimeout(() => setSubmitStatus(""), 2000);
    }
  };
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
      <div className="flex gap-4 h-1/2">
      <form
        className=" bg-blue-300 h-full rounded-lg p-1 text-black"
        onSubmit={handleSubmit}
      >
        <p className="text-xl mb-2">Add Plans</p>
        <input
          type="text"
          placeholder="Amount"
          className="bg-transparent border-2 w-full placeholder:text-zinc-900 mb-2"
          name="amount"
          value={planDetails.amount}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Duration"
          className="bg-transparent border-2 w-full placeholder:text-zinc-900 mb-2"
          name="duration"
          value={planDetails.duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Description"
          className="bg-transparent border-2 w-full placeholder:text-zinc-900 mb-2"
          name="description"
          value={planDetails.description}
          onChange={handleInputChange}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-900 text-white p-1 rounded-md w-1/3"
            disabled={loading}
          >
            {submitStatus || (loading ? "Adding..." : "Add")}
          </button>
        </div>
      </form>
    </div></div>
    </div>
  );
};

export default AddPlans;
