import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignupUser = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signupUser = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
    address,
    age,
    phone,
  }) => {
    console.log(fullName, email, password, confirmPassword);
    const success = handleInputError({
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      address,
      age,
      phone,
    });
    if (!success) return false;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signupUser", {
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
          phone,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("common-user", JSON.stringify(data));
      setAuthUser(data);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, signupUser };
};

export default useSignupUser;

function handleInputError({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
  address,
  age,
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
    !phone
  ) {
    console.log("check");
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
