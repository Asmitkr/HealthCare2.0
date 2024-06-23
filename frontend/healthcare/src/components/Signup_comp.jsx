import React from "react";
import image from "../assets/login.jpg";
import { useState } from "react";
import useSignupComp from "../hooks/useSignupComp";

const Signup_comp = () => {
  const [inputs, SetInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });
  const { loading, signupComp } = useSignupComp();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedInputs = { ...inputs };
    await signupComp(updatedInputs);
  };

  return (
    <div>
      <div>
        <div>
          <div className="py-20 px-20 flex justify-center w-full h-screen bg-zinc-900">
            <div
              className="relative flex flex-col justify-center  w-full rounded-lg"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
              }}
            >
              <div className="absolute right-12">
                <h1 className=" text-2xl mb-3">Register as a Company</h1>
                <form
                  className=" flex flex-col h-1/2"
                  action=""
                  onSubmit={handleSubmit}
                >
                  <input
                    className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded"
                    type="text"
                    placeholder="Name"
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
                    placeholder="Address"
                    value={inputs.address}
                    onChange={(e) =>
                      SetInputs({ ...inputs, address: e.target.value })
                    }
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
                    <button
                      className="btn btn-block btn-sm mt-2 border border-slate-700"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup_comp;
