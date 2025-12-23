
import React, { useState } from "react";
import logo from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../utils/axios.js";
import { serverUrl } from "../App.jsx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Uploaded file URL (provided by you / present in session):
// /mnt/data/11c4bd35-8905-4eb9-bc1f-38c8441bcda0.png

function SignUp() {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Password validation rules (Option 2 - Strong)
  const passwordRules = {
    minLength: 8,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
  };

  // VALIDATION FUNCTION
  const validateInputs = () => {
    let valid = true;
    let newErrors = { name: "", userName: "", email: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!userName.trim()) {
      newErrors.userName = "Username is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      // check each strong rule
      if (password.length < passwordRules.minLength) {
        newErrors.password = `Password must be at least ${passwordRules.minLength} characters`;
        valid = false;
      } else if (!passwordRules.uppercase.test(password)) {
        newErrors.password = "Password must contain at least 1 uppercase letter";
        valid = false;
      } else if (!passwordRules.lowercase.test(password)) {
        newErrors.password = "Password must contain at least 1 lowercase letter";
        valid = false;
      } else if (!passwordRules.number.test(password)) {
        newErrors.password = "Password must contain at least 1 number";
        valid = false;
      } else if (!passwordRules.special.test(password)) {
        newErrors.password = "Password must contain at least 1 special character";
        valid = false;
      }
    }

    setErrors(newErrors);

    // show toast for the first validation error (keeps UX clean)
    if (!valid) {
      const firstError =
        newErrors.name || newErrors.userName || newErrors.email || newErrors.password;
      if (firstError) toast.error(firstError, { position: "top-right" });
    }

    return valid;
  };

  // SIGNUP HANDLER
  const handleSignUp = async () => {
    console.log('server url');
    console.log(serverUrl);
    if (!validateInputs()) return;

    setloading(true);
    try {
      const result = await api.post(
        `/api/auth/signup`,
        { name, userName, email, password },
        { withCredentials: true }
      );

      // success from backend
      dispatch(setUserData(result.data));
      toast.success("Signup successful! Redirecting to sign in...", {
        position: "top-right",
      });

      setloading(false);
      navigate("/signin");
    } catch (error) {
      // handle backend error message if available
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Signup failed. Please try again.";
      toast.error(message, { position: "top-right" });
      console.error("Signup error:", error);
      setloading(false);
    }
  };

  return (
    <>
      {/* Toast container - colored theme, top-right as requested */}
      <ToastContainer position="top-right" theme="colored" />

      <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
        <div className="w-[90%] lg:max-w-[60%] h-[530px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">

          {/* LEFT SECTION */}
          <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[15px]">
            <div className="flex flex-col items-center justify-center w-full mt-6">
              <span>Sign Up to</span>
              <img src={logo} alt="logo" className="w-[100px]" />
            </div>

            {/* NAME INPUT */}
            <div>
              <div
                className={`relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 overflow-visible ${
                  errors.name ? "border-red-500" : "border-black"
                }`}
                onClick={() => setInputClicked({ ...inputClicked, name: true })}
              >
                <label
                  htmlFor="name"
                  className={`absolute left-[20px] p-[5px] bg-white text-[15px] ${
                    inputClicked.name ? "top-[-15px]" : ""
                  }`}
                >
                  Enter Your Name
                </label>

                <input
                  type="text"
                  id="name"
                  className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="h-[20px]">
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
            </div>

            {/* USERNAME INPUT */}
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
                    inputClicked.userName ? "top-[-15px]" : ""
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

            {/* EMAIL INPUT */}
            <div>
              <div
                className={`relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 overflow-visible ${
                  errors.email ? "border-red-500" : "border-black"
                }`}
                onClick={() => setInputClicked({ ...inputClicked, email: true })}
              >
                <label
                  htmlFor="email"
                  className={`absolute left-[20px] p-[5px] bg-white text-[15px] ${
                    inputClicked.email ? "top-[-15px]" : ""
                  }`}
                >
                  Enter Email
                </label>

                <input
                  type="email"
                  id="email"
                  className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="h-[20px]">
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* PASSWORD INPUT */}
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
                    inputClicked.password ? "top-[-15px]" : ""
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

            {/* SIGNUP BUTTON */}
            <button
              type="button"
              className="w-[75%] sm:w-[70%] md:w-[60%] lg:w-[75%] xl:w-[50%] bg-gradient-to-r from-[#00f5d4] via-[#00bbf9] to-[#9b5de5] text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "SignUp"}
            </button>

            <p
              className="cursor-pointer text-gray-800"
              onClick={() => navigate("/signin")}
            >
              Already Have An Account?{" "}
              <span className="border-b-2 border-black">Sign In</span>
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-black flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
            <img src={logo2} alt="" className="w-[60%]" />
            <p>Where People Stays In A Loop</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignUp;
