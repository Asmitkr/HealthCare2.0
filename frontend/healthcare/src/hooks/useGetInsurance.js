import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetInsurance = () => {
  const [loading, setLoading] = React.useState(false);
  const [insurance, setInsurance] = React.useState([]);

  useEffect(() => {
    const getAppts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/insurance/CurrentInsurance");
        const data = await res.json();
        console.log("insurance data", data);
        if (data.error) {
          throw new Error(data.error);
        }
        // console.log("insurance data", data);
        setInsurance(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAppts();
  }, []);
  return { loading, insurance };
};

export default useGetInsurance;
