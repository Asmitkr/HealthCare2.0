import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetApprovedInsuComp = () => {
  const [loading, setLoading] = React.useState(false);
  const [approvedInsu, setApprovedInsu] = React.useState([]);

  useEffect(() => {
    const getApprovedInsu = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/insurance/CompanyInsurance");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setApprovedInsu(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getApprovedInsu();
  }, []);
  return { loading, approvedInsu };
};

export default useGetApprovedInsuComp;
