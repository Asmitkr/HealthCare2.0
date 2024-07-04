import React, { useEffect } from "react"; // Import useEffect
import image from "../assets/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginAppUser from "../hooks/useLoginUser";

const Login = () => {
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAppUser, loading, check } = useLoginAppUser();
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs when `check` changes.
    if (check) {
      if (type === "User") navigate("/userhome");
      else if (type === "Doctor") navigate("/doctorhome");
      else if (type === "Company") navigate("/companyhome");
    }
  }, [check, navigate, type]); // Depend on `check`, `navigate`, and `type`

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAppUser({ type, email, password }); // Ensure this call is awaited
    // Removed navigation logic from here
  };

  return (
    <div className="py-20 px-20 flex justify-center w-full h-screen bg-zinc-900">
      <div
        className="relative flex flex-col justify-center w-full rounded-lg"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className="absolute right-12">
          <h1 className="text-2xl mb-3">Login!</h1>
          <form className="flex flex-col h-1/2" onSubmit={handleSubmit}>
            <select
              className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Doctor">Doctor</option>
              <option value="Company">Company</option>
            </select>
            <input
              className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="placeholder:text-zinc-500 bg-transparent w-72 outline-none rounded"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-block btn-sm bg-green-500 w-72 outline-none rounded mt-3 border border-slate-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login!"}
            </button>
          </form>
          <a className="absolute right-0 text-blue-500 mt-3" href="/signup">
            Don't have an Account!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
