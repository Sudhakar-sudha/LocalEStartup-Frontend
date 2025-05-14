import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);


  const verifyOtp = async () => {
    if (!email || otp.length !== 6) {
      alert("Invalid OTP! Please enter a valid email and a 6-digit OTP.");
      return;
    }
  
    try {
      console.log("Sending OTP verification request:", email, otp);
  
      const response = await axios.post(`${BASE_URL}/api/deliveryboys/verify-otp`, { email, otp });
  
      console.log("Response received:", response.data);
  
      if (response.data.success) {
        alert("OTP verified successfully!");
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
  
      if (error.response) {
        // Server responded with an error
        alert(`Error: ${error.response.data.message}`);
      } else {
        // Network or other error
        alert("Failed to verify OTP. Try again.");
      }
    }
  };
  

  const resendOtp = async () => {
    setTimer(60);
    setResendDisabled(true);
  
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
  
    try {
      console.log("Requesting OTP resend for:", email);
  
      await axios.post(`${BASE_URL}/api/deliveryboys/resend-otp`, { email });
      
      alert("New OTP sent to your email.");
    } catch (error) {
      console.error("Resend OTP Error:", error);
  
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to resend OTP. Try again.");
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-2 text-center">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-4">OTP sent to {email}</p>

        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Verify OTP
        </button>

        {timer > 0 ? (
          <p className="text-gray-600 text-center mt-4">Resend OTP in {timer}s</p>
        ) : (
          <button
            onClick={resendOtp}
            disabled={resendDisabled}
            className="text-blue-500 font-semibold mt-4 w-full"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;