import { useState } from "react";
import toast from "react-hot-toast";

const useApplyInsurance = () => {
  const [loading, setLoading] = useState(false);

  const applyInsurance = async (data) => {
    setLoading(true);
    // Convert startDate from yyyy-mm-dd to dd-mm-yyyy
    if (data.startDate) {
      const parts = data.startDate.split("-");
      data.startDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    console.log(data);

    try {
      const res = await fetch("/api/insurance/ApplyInsurance", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (resData.error) {
        throw new Error(resData.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, applyInsurance };
};

export default useApplyInsurance;
