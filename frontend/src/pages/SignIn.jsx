
import React, { useState, useEffect } from "react";
import logo from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [inputClicked, setInputClicked] = useState({
    userName: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Validation Errors
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    apiError: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load remembered username
  useEffect(() => {
    const savedUser = localStorage.getItem("savedUserName");
    if (savedUser) {
      setUserName(savedUser);
      setRememberMe(true);
    }
  }, []);

  // VALIDATION FUNCTION
  const validateInputs = () => {
    let valid = true;
    let newErrors = { userName: "", password: "", apiError: "" };

    if (!userName.trim()) {
      newErrors.userName = "Username is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    setloading(true);
    setErrors({ ...errors, apiError: "" });

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { userName, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));

      toast.success("Login Successful!", { position: "top-center" });

      if (rememberMe) {
        localStorage.setItem("savedUserName", userName);
      } else {
        localStorage.removeItem("savedUserName");
      }

      setloading(false);
    } catch (error) {
      console.log(error);

      setErrors({
        ...errors,
        apiError: "Invalid username or password",
      });

      toast.error("Login Failed! Incorrect credentials.", {
        position: "top-center",
      });

      setloading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <ToastContainer />

      <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
        <div className="w-[80%] lg:max-w-[50%] h-[520px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[10px] justify-center">
            
            <div className="flex flex-col items-center justify-center w-full mt-4">
              <span>Sign In to</span>
              <img src={logo} alt="logo" className="w-[100px] object-contain" />
            </div>

            {/* USERNAME */}
            <div>
              <div
                className={`relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 overflow-visible ${
                  errors.userName ? "border-red-500" : "border-black"
                }`}
                onClick={() =>
                  setInputClicked({ ...inputClicked, userName: true })
                }
              >
                <label
                  htmlFor="userName"
                  className={`absolute left-[20px] p-[5px] bg-white text-[15px] ${
                    inputClicked.userName || userName ? "top-[-15px]" : ""
                  }`}
                >
                  Enter Username
                </label>

                <input
                  type="text"
                  id="userName"
                  className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="h-[20px]">
                {errors.userName && (
                  <p className="text-red-500 text-sm">{errors.userName}</p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div
                className={`relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 overflow-visible ${
                  errors.password ? "border-red-500" : "border-black"
                }`}
                onClick={() =>
                  setInputClicked({ ...inputClicked, password: true })
                }
              >
                <label
                  htmlFor="password"
                  className={`absolute left-[20px] p-[5px] bg-white text-[15px] ${
                    inputClicked.password || password ? "top-[-15px]" : ""
                  }`}
                >
                  Enter Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-[20px] cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-[20px] cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className="h-[20px]">
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            {/* API ERROR */}
            <div className="h-[20px] w-[90%]">
              {errors.apiError && (
                <p className="text-red-600 text-sm">{errors.apiError}</p>
              )}
            </div>

            {/* REMEMBER ME */}
            <div className="w-[90%] flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember Me</span>
            </div>

            {/* FORGOT PASSWORD */}
            <div
              className="w-[90%] px-[15px] cursor-pointer text-blue-600"
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot Password?
            </div>

            {/* SIGNIN BUTTON */}
            <button
              type="button"
              className="w-[75%] sm:w-[70%] md:w-[60%] lg:w-[80%] xl:w-[50%]
              bg-gradient-to-r from-[#00f5d4] via-[#00bbf9] to-[#9b5de5]
              text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "SignIn"}
            </button>

            <p
              className="cursor-pointer text-gray-800"
              onClick={() => navigate("/signup")}
            >
              Want To Create A New Account?{" "}
              <span className="border-b-2 border-black">Sign Up</span>
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-black flex-col gap-[10px] text-white rounded-l-[30px] shadow-2xl shadow-black">
            <img src={logo2} alt="" className="w-[60%]" />
            <p>Where People Stays In A Loop</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignIn;
