import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetPendingReq = () => {
  const [loading, setLoading] = React.useState(false);
  const [pendingReq, setPendingReq] = React.useState([]);

  useEffect(() => {
    const getPendingReq = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/appointment/pendingRequest");
        const data = await res.json();
        console.log("Pending req", data);
        if (data.error) {
          throw new Error(data.error);
        }
        setPendingReq(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPendingReq();
  }, []);
  return { loading, pendingReq };
};

export default useGetPendingReq;
