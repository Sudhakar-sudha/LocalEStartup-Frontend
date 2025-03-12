import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

// const BASE_URL = "http://localhost:3000"; // Define the base URL
const BASE_URL ="https://localestartup-backend.onrender.com";

const OTPVerification = () => {
  const location = useLocation();
  const email = location.state?.email || "N/A"; // Get email from previous screen
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

  // 📌 Handle Resend OTP
  const handleGetOtp = async () => {
    setResendLoading(true);
    setResendDisabled(true);

    try {
      const response = await fetch(`${BASE_URL}/sellerdata/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("OTP sent to your email.");
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP.");
    }

    setTimeout(() => {
      setResendDisabled(false);
    }, 30000); // Disable button for 30s

    setTimeout(() => {
      setResendLoading(false);
    }, 3000); // Show loading for 1s
  };

  // 📌 Handle Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      return setMessage("Please enter a valid OTP");
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/sellerdata/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("OTP verified successfully! Redirecting...");
        const token = result.token; // Get token from backend

        // Set the redirect URL (useEffect will handle the delay)
        setRedirectUrl(`https://localestartup.vercel.app/sellerdata/user/verify/${token}`);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Delayed Redirect Effect (5 seconds)
  useEffect(() => {
    if (redirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [redirectUrl]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">OTP Verification</h2>
        <p className="text-gray-600 text-sm">
          OTP has been sent to <strong>{email}</strong>
        </p>

        {/* OTP Input & Verify Button */}
        <div className="mt-5 flex items-center gap-3">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border border-gray-300 p-3 rounded-lg text-center text-lg tracking-widest w-full outline-none transition focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleVerifyOtp}
            disabled={otp.length < 6 || loading}
            className={`px-4 py-3 rounded-lg flex items-center gap-2 text-white font-medium transition ${
              otp.length < 6 || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? <IoReload className="animate-spin" /> : <FaCheckCircle />}
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>

        {/* Resend OTP Button */}
        <button
          onClick={handleGetOtp}
          disabled={resendDisabled}
          className={`mt-5 px-4 py-3 w-full rounded-lg flex justify-center items-center gap-2 text-white font-medium transition ${
            resendDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {resendLoading ? <IoReload className="animate-spin" /> : <IoReload />}
          {resendLoading ? "Sending..." : resendDisabled ? "Wait 30s" : "Resend OTP"}
        </button>

        {/* Display messages */}
        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
