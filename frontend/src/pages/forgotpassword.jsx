
import axios from "axios";
import { serverUrl } from "../App.jsx";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");

  // show/hide passwords
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Strong password validation rules
  const passwordRules = {
    minLength: 8,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
  };

  // ---------------- Step 1 ----------------
  const handleStep1 = async () => {
    if (!email.trim()) return toast.error("Email is required");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return toast.error("Enter a valid email");

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      console.log(error);
      toast.error("Email not found or server error");
    }
    setLoading(false);
  };

  // ---------------- Step 2 ----------------
  const handleStep2 = async () => {
    if (!otp.trim()) return toast.error("OTP is required");

    if (!/^\d+$/.test(otp)) return toast.error("OTP must contain digits only");

    if (otp.length < 4) return toast.error("Invalid OTP");

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("OTP verified!");
      setStep(3);
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP");
    }
    setLoading(false);
  };

  // ---------------- Step 3 ----------------
  const handleStep3 = async () => {
    if (!newPassword.trim()) return toast.error("New password is required");
    if (!confirmNewPassword.trim()) return toast.error("Confirm password is required");

    // strong password validation
    if (newPassword.length < passwordRules.minLength)
      return toast.error("Password must be at least 8 characters long");

    if (!passwordRules.uppercase.test(newPassword))
      return toast.error("Password must have at least 1 uppercase letter");

    if (!passwordRules.lowercase.test(newPassword))
      return toast.error("Password must have at least 1 lowercase letter");

    if (!passwordRules.number.test(newPassword))
      return toast.error("Password must have at least 1 number");

    if (!passwordRules.special.test(newPassword))
      return toast.error("Password must have at least 1 special character");

    if (newPassword !== confirmNewPassword)
      return toast.error("Passwords do not match");

    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        { email, password: newPassword },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Password reset successful!");

      // clear and redirect
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <ToastContainer theme="colored" position="top-right" />

      {/* STEP 1 */}
      {step === 1 && (
        <div className="w-[90%] max-w-[500px] h-[400px] bg-white rounded-2xl flex justify-center items-center flex-col">
          <h2 className="text-[30px] font-semibold">Enter Email To get OTP</h2>

          <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] border-2 border-black rounded-2xl"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`absolute left-[20px] p-[5px] bg-white ${
                inputClicked.email ? "top-[-15px]" : ""
              }`}
            >
              Enter email
            </label>

            <input
              type="email"
              id="email"
              className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="w-[55%] mt-[30px] bg-gradient-to-r from-[#00f5d4] via-[#00bbf9] to-[#9b5de5]
            text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90"
            disabled={loading}
            onClick={handleStep1}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send Email"}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="w-[90%] max-w-[500px] h-[400px] bg-white rounded-2xl flex justify-center items-center flex-col">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>

          <div
            className="relative flex items-center mt-[30px] justify-start w-[90%] h-[50px] border-2 border-black rounded-2xl"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`absolute left-[20px] p-[5px] bg-white ${
                inputClicked.otp ? "top-[-15px]" : ""
              }`}
            >
              Enter OTP
            </label>

            <input
              type="text"
              id="otp"
              className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="w-[55%] mt-[30px] bg-gradient-to-r from-[#00f5d4] via-[#00bbf9] to-[#9b5de5]
            text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90"
            disabled={loading}
            onClick={handleStep2}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="w-[90%] max-w-[500px] h-[400px] bg-white rounded-2xl flex justify-center items-center flex-col">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>

          {/* NEW PASSWORD */}
          <div
            className="relative flex items-center mt-[30px] w-[90%] h-[50px] border-2 border-black rounded-2xl"
            onClick={() =>
              setInputClicked({ ...inputClicked, newPassword: true })
            }
          >
            <label
              htmlFor="newPassword"
              className={`absolute left-[20px] p-[5px] bg-white ${
                inputClicked.newPassword ? "top-[-15px]" : ""
              }`}
            >
              Enter New Password
            </label>

            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {showNewPassword ? (
              <FaEyeSlash
                className="absolute right-[20px] cursor-pointer"
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute right-[20px] cursor-pointer"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div
            className="relative flex items-center mt-[30px] w-[90%] h-[50px] border-2 border-black rounded-2xl"
            onClick={() =>
              setInputClicked({ ...inputClicked, confirmNewPassword: true })
            }
          >
            <label
              htmlFor="confirmNewPassword"
              className={`absolute left-[20px] p-[5px] bg-white ${
                inputClicked.confirmNewPassword ? "top-[-15px]" : ""
              }`}
            >
              Enter Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmNewPassword"
              className="w-full h-full rounded-xl px-10 py-3 text-black focus:outline-none"
              value={confirmNewPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {showConfirmPassword ? (
              <FaEyeSlash
                className="absolute right-[20px] cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <FaEye
                className="absolute right-[20px] cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>

          <button
            type="button"
            className="w-[55%] mt-[30px] bg-gradient-to-r from-[#00f5d4] via-[#00bbf9] to-[#9b5de5]
            text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90"
            disabled={loading}
            onClick={handleStep3}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;


