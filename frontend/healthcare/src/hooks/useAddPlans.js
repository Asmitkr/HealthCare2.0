import { useState } from "react";
import toast from "react-hot-toast";

const useAddPlans = () => {
  const [loading, setLoading] = useState(false);

  const addPlan = async ({ amount, duration, description }) => {
    setLoading(true);
    const dataToSend = {
      amount,
      duration,
      type: description, // Changed 'description' to 'type'
    };
    console.log(dataToSend);
    try {
      const res = await fetch("/api/insurance/AddPlan", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend),
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

  return { loading, addPlan };
};

export default useAddPlans;
