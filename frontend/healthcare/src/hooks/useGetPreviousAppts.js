import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useGetPrevAppt = () => {
  const [loading, setLoading] = useState(false);
  const [prevAppt, setPrevAppt] = useState([]);

  const getPrevAppt = useCallback(async (patientId) => {
    if (!patientId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/appointment/previousAppointment?patientId=${patientId}`
      );
      const data = await res.json();
      console.log("previous appts", data);
      if (data.error) {
        throw new Error(data.error);
      }
      setPrevAppt(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, prevAppt, getPrevAppt };
};

export default useGetPrevAppt;
