import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetPlansComp = () => {
  const [loading, setLoading] = React.useState(false);
  const [plansComp, setPlansComp] = React.useState([]);

  useEffect(() => {
    const getPlansComp = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/insurance/SearchPlan");
        const data = await res.json();
        console.log("plans", data);
        if (data.error) {
          throw new Error(data.error);
        }
        setPlansComp(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPlansComp();
  }, []);
  return { loading, plansComp };
};

export default useGetPlansComp;
