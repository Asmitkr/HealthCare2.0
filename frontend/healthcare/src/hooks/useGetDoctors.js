import React, { useEffect } from "react";
import toast from "react-hot-toast";

const useGetDoctors = () => {
  const [loading, setLoading] = React.useState(false);
  const [doctors, setDoctors] = React.useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/doctors"); // Updated endpoint to fetch doctors
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setDoctors(data); // Update state with fetched doctors
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);
  return { loading, doctors }; // Return loading state and doctors list
};

export default useGetDoctors;
