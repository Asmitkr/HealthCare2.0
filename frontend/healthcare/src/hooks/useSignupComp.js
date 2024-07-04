import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignupComp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signupComp = async ({
    fullName,
    email,
    password,
    confirmPassword,
    address,
    phone,
  }) => {
    const success = handleInputError({
      fullName,
      email,
      password,
      confirmPassword,
      address,
      phone,
    });
    if (!success) return { success: false, error: "Validation failed" };

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signupComp", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          address,
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

  return { loading, signupComp };
};

export default useSignupComp;

function handleInputError({
  fullName,
  email,
  password,
  confirmPassword,
  address,
  phone,
}) {
  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !address ||
    !phone
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
