import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";

const formatDate = (date) => {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    date = new Date(date);
  }
  if (!(date instanceof Date)) return date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const useScheduleAppt = () => {
  const [loading, setLoading] = useState(false);
  const scheduleAppt = async (data) => {
    const formattedData = {
      ...data,
      date: formatDate(data.date),
    };
    console.log(typeof formattedData.date);
    setLoading(true);
    try {
      const res = await fetch("/api/appointment/ScheduleAppointment", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const resData = await res.json();
      if (resData.error) {
        throw new Error(resData.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, scheduleAppt };
};

export default useScheduleAppt;
