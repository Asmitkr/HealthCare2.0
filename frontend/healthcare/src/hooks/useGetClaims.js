import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetClaims = () => {
  const [loading, setLoading] = React.useState(false);
  const [claims, setClaims] = React.useState([]);

  useEffect(() => {
    const getClaims = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/insurance/getClaim");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setClaims(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getClaims();
  }, []);
  return { loading, claims };
};

export default useGetClaims;
