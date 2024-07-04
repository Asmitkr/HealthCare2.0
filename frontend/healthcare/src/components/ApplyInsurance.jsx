import React from "react";
import { useState } from "react";
import SearchCompanies from "./SearchCompanies";
import useCompanyInfo from "../../zustand/useCompanyInfo";
import useApplyInsurance from "../hooks/useApplyInsurance";
import image from "../assets/bg.webp";

const ApplyInsurance = () => {
  const { companyInfo } = useCompanyInfo();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [startDate, setStartDate] = useState("");
  const { loading, applyInsurance } = useApplyInsurance();

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setSelectedPlan(null);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany || !startDate || !selectedPlan) {
      alert("Please fill in all fields");
      return;
    }
    const data = {
      companyid: selectedCompany._id,
      startDate: startDate,
      planid: selectedPlan._id,
      amount: selectedPlan.amount,
      duration: selectedPlan.duration,
    };
    console.log(data);
    await applyInsurance(data);
  };

  return (
    <div className=" p-5 bg-zinc-900 min-h-screen  text-white"
    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      <div className="relative flex mb-2">
        <div>Username</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div><div className="flex mt-4">
      <div className="rounded-md mr-5 p-2 min-h-screen  bg-blue-500 flex flex-col">
        <a href="/currentappt">Current Appointment</a>
        <a href="/currentinsurance">Current Insurance</a>
        <a href="/scheduleappt">Schedule Appointment</a>
        <a href="/applyinsurance">Apply for Insurance</a>
      </div>
    <div className="w-1/2 bg-blue-300 min-h-screen rounded-lg p-1 text-black">
      <p className="text-xl mb-2">Apply For Insurance</p>
      <SearchCompanies />

      <div className="mt-2 w-full bg-blue-300  rounded-lg p-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Company and their plans</h2>
        {companyInfo && companyInfo.length > 0 ? (
          <div
            style={{
              height: "100vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {companyInfo.map((company, index) => (
              <div
                key={index}
                className="space-y-2 mb-4 border-b pb-4"
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <div className="flex-1">
                  <p>
                    <strong>Full Name:</strong> {company.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {company.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {company.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {company.phone}
                  </p>
                </div>
                <div style={{ overflowX: "auto", display: "flex" }}>
                  {company.plans &&
                    Array.isArray(company.plans) &&
                    company.plans.map((plan, planIndex) => (
                      <div key={planIndex} className="min-w-max p-2 border-2 rounded mr-1">
                        <p>
                          Plan {planIndex + 1}: {plan.type}
                        </p>
                        <p>Amount: {plan.amount}</p>
                        <p>Duration: {plan.duration}</p>
                        <button
                          className="bg-blue-500 text-white p-2 rounded"
                          onClick={() => {
                            handleSelectCompany(company);
                            handleSelectPlan(plan);
                          }}
                        >
                          Select
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No company details available.</p>
        )}
      </div>
      {selectedCompany && (
        <div>
          <h3>Select a Plan:</h3>
          {selectedCompany.plans.map((plan, index) => (
            <button
              key={index}
              className={`bg-blue-300 text-black p-2 rounded ${
                selectedPlan && selectedPlan._id === plan._id
                  ? "bg-blue-500"
                  : ""
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              Plan {index + 1}
            </button>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="p-5 bg-transparent w-full text-white border-2">
              <label htmlFor="datepicker" className="text-zinc-900">
                Select the Start date:
              </label>
              <input
                type="date"
                id="datepicker"
                className="border-2 mt-2 w-full bg-blue-300 rounded-lg p-1 text-black"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply Insurance"}
            </button>
          </form>
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default ApplyInsurance;
