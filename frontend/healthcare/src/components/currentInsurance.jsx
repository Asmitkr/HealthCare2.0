import React, { useState } from "react";
import useGetInsurance from "../hooks/useGetInsurance";
import useApplyClaim from "../hooks/useApplyClaim";

const InsuranceRow = ({
  ins,
  showDescriptionBox,
  setShowDescriptionBox,
  description,
  setDescription,
  handleApplyClaim,
  loadingClaim,
}) => {
  return (
    <tr>
      <td className="text-left">{ins.companyname}</td>
      <td className="text-left">{ins.planid}</td>
      <td className="text-left">{ins.startDate}</td>
      <td className="text-left">{ins.endDate}</td>
      <td className="text-left">{ins.amount}</td>
      <td className="text-left">{ins.status}</td>
      <td className="text-left">{ins.claimRequest}</td>

      <td className="text-left">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={() =>
            setShowDescriptionBox(
              ins._id === showDescriptionBox ? null : ins._id
            )
          }
        >
          Claim
        </button>
        {showDescriptionBox === ins._id && (
          <div>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
              onClick={() => handleApplyClaim(ins._id)}
              disabled={loadingClaim}
            >
              Submit
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const CurrentInsurance = () => {
  const { loading: loadingInsurance, insurance } = useGetInsurance();
  const { loading: loadingClaim, applyClaim } = useApplyClaim();
  const [showDescriptionBox, setShowDescriptionBox] = useState(null);
  const [description, setDescription] = useState("");

  const handleApplyClaim = async (insId) => {
    await applyClaim({ _id: insId, description });
    setShowDescriptionBox(null); // Hide the description box after submitting
    setDescription(""); // Reset description input
  };

  return (
    <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
      <p className="text-xl">Current Insurance</p>
      {loadingInsurance ? (
        <p>Loading insurance...</p>
      ) : insurance.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Company's Name</th>
              <th className="text-left">Plan id</th>
              <th className="text-left">Start Date</th>
              <th className="text-left">End Date</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
              <th className="text-left">Claim Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {insurance.map((ins) => (
              <InsuranceRow
                key={ins.id}
                ins={ins}
                showDescriptionBox={showDescriptionBox}
                setShowDescriptionBox={setShowDescriptionBox}
                description={description}
                setDescription={setDescription}
                handleApplyClaim={handleApplyClaim}
                loadingClaim={loadingClaim}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No insurance found.</p>
      )}
    </div>
  );
};

export default CurrentInsurance;
