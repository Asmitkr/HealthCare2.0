import React from "react";
import image from "../assets/login.jpg";
import { useState } from "react";
import useSignupUser from "../hooks/useSignupUser";
import { useNavigate } from "react-router-dom";

const Signup_user = () => {
  const [inputs, SetInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    age: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { loading, signupUser } = useSignupUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedInputs = { ...inputs };
    await signupUser(updatedInputs);
    navigate("/userhome");
  };

  return (
    <div>
      <div className="py-20 px-20 flex justify-center w-full h-screen bg-zinc-900">
        <div
          className="relative flex flex-col justify-center  w-full rounded-lg"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        >
          <div className="absolute right-12">
            <h1 className=" text-2xl mb-3">Register as a User</h1>
            <form
              className=" flex flex-col h-1/2"
              action=""
              onSubmit={handleSubmit}
            >
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="text"
                placeholder="Full Name"
                value={inputs.fullName}
                onChange={(e) =>
                  SetInputs({ ...inputs, fullName: e.target.value })
                }
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="text"
                placeholder="Email"
                value={inputs.email}
                onChange={(e) =>
                  SetInputs({ ...inputs, email: e.target.value })
                }
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="password"
                placeholder="Password"
                value={inputs.password}
                onChange={(e) =>
                  SetInputs({ ...inputs, password: e.target.value })
                }
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="password"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  SetInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="text"
                placeholder="Gender"
                value={inputs.gender}
                onChange={(e) =>
                  SetInputs({ ...inputs, gender: e.target.value })
                }
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="text"
                placeholder="Address"
                value={inputs.address}
                onChange={(e) =>
                  SetInputs({ ...inputs, address: e.target.value })
                }
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="Number"
                placeholder="Age"
                value={inputs.age}
                onChange={(e) => SetInputs({ ...inputs, age: e.target.value })}
              />
              <input
                className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                type="text"
                placeholder="Phone Number"
                value={inputs.phone}
                onChange={(e) =>
                  SetInputs({ ...inputs, phone: e.target.value })
                }
              />
              <div>
                <button href='/userhome'
                  className="btn btn-block btn-sm mt-2 border border-slate-700 bg-green-500 w-72 outline-none rounded mt-3 border"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              {/* <input
                className="placeholder:text-zinc-500 bg-green-500 w-72 outline-none rounded mt-3"
                type="submit"
                value="Sign Up"
              /> */}
            </form>
            <a className="absolute right-0 text-blue-500 mt-3" href="/">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup_user;
