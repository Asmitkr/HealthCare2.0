import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetAppts = () => {
  const [loading, setLoading] = React.useState(false);
  const [appts, setAppts] = React.useState([]);

  useEffect(() => {
    const getAppts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/appointment/CurrentAppointments");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setAppts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAppts();
  }, []);
  return { loading, appts };
};

export default useGetAppts;
