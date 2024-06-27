import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetPlans = () => {
  const [loading, setLoading] = React.useState(false);
  const [plans, setPlans] = React.useState([]);

  useEffect(() => {
    const getPlans = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/insurancePlans"); // Updated endpoint to fetch plans
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPlans(data); // Update state with fetched plans
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPlans();
  }, []);
  return { loading, plans }; // Return loading state and plans list
};

export default useGetPlans;
