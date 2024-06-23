import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLoginAppUser = () => {
  const [loading, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();
  const loginAppUser = async ({ type, email, password }) => {
    const success = handleInputError({
      type,
      email,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      let data;
      if (type === "User") {
        const res = await fetch("/api/auth/signinUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
      } else if (type === "Doctor") {
        const res = await fetch("/api/auth/signinDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
      } else if (type === "Company") {
        const res = await fetch("/api/auth/signinComp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
      }
      console.log(data);
      localStorage.setItem("common-user", JSON.stringify(data));

      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginAppUser, loading };
};

export default useLoginAppUser;

function handleInputError({ email, password, type }) {
  //   console.log(email);
  if (!email || !password || !type) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Invalid Email");
    return false;
  }

  if (type !== "User" && type !== "Doctor" && type !== "Company") {
    toast.error("Invalid User Type");
    return false;
  }

  return true;
}
