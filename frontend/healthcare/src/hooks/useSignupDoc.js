import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const useSignupDoc = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signupDoc = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
    address,
    age,
    type,
    phone,
  }) => {
    const success = handleInputError({
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      address,
      age,
      type,
      phone,
    });
    if (!success) return { success: false, error: "Validation failed" };

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signupDoc", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender,
          address,
          age,
          type,
          phone,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("common-user", JSON.stringify(data));
      setAuthUser(data);
      return { success: true, data };
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { signupDoc, loading };
};

export default useSignupDoc;

function handleInputError({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
  address,
  age,
  type,
  phone,
}) {
  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender ||
    !address ||
    !age ||
    !phone ||
    !type
  ) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
