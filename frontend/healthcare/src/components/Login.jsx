import React from "react";
import image from "../assets/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useLoginAppUser from "../hooks/useLoginUser";

const Login = () => {
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAppUser, loading, check } = useLoginAppUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginAppUser({ type, email, password });
    // Assuming loginAppUser returns a promise that resolves to a truthy value on success
    console.log(check);
    if (check) {
      if(type=='User')
      navigate("/userhome"); // Navigate on successful login
      if(type=='Doctor')
        navigate("/doctorhome");
      if(type=='Company')
        navigate("/companyhome");
    }
  };

  return (
    <div className="py-20 px-20 flex justify-center w-full h-screen bg-zinc-900">
      <div
        className="relative flex flex-col justify-center  w-full rounded-lg"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      >
        <div className="absolute right-12">
          <h1 className=" text-2xl mb-3">Login!</h1>
          <form
            className=" flex flex-col h-1/2"
            onSubmit={handleSubmit} // Use handleSubmit for form submission
          >
            
<div class="flex items-center">
    <input id="checkbox1" type="checkbox" value="" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="checkbox1" class="ms-2 text-sm font-medium text-red-900 dark:text-zinc-900">User</label>
</div>
<div class="flex items-center">
    <input  id="checkbox2" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="checkbox2" class="ms-2 text-sm font-medium text-gray-900 dark:text-zinc-900">Doctor</label>
</div>
<div class="flex items-center">
    <input id="checkbox3" type="checkbox" value="" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="checkbox3" class="ms-2 text-sm font-medium text-red-900 dark:text-zinc-900">Company</label>
</div>

            <input
              className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
              type="text"
              placeholder="User/Doctor/Company"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
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
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login!"
              )}
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
