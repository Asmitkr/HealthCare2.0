import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetCompanies = () => {
  const [loading, setLoading] = React.useState(false);
  const [companies, setCompanies] = React.useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/companies");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setCompanies(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);
  return { loading, companies };
};

export default useGetCompanies;
