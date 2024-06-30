import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useUpcomingApptDoc = () => {
  const [loading, setLoading] = React.useState(false);
  const [upcomingAppts, setUpcomingAppts] = React.useState([]);

  useEffect(() => {
    const upcomingApptDoc = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/appointment/upcomingAppointment");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setUpcomingAppts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    upcomingApptDoc();
  }, []);
  return { loading, upcomingAppts };
};

export default useUpcomingApptDoc;
