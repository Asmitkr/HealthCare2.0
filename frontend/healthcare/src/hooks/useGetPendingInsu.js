import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetPendingInsu = () => {
  const [loading, setLoading] = React.useState(false);
  const [pendingInsu, setPendingInsu] = React.useState([]);

  useEffect(() => {
    const getPendingInsu = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/insurance/PendingInsurance");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setPendingInsu(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPendingInsu();
  }, []);
  return { loading, pendingInsu };
};

export default useGetPendingInsu;
