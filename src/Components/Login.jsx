


import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  console.log(BASE_URL);
    try {
      // Send email and password to the backend for authentication
      const response = await axios.post(
        `${BASE_URL}/sellerdata/login-seller-data`,
        { email }
      );
  
      // Debug: Log full response
      console.log("Response from backend:", response.data);
  
      // Check if login was successful and user data exists
      if (response.status === 200 && response.data.user && response.data.user.id) {
        const userId = response.data.user.id; // Extract user ID
        console.log("User ID:", userId);
  
        // Show success message
        toast.success("🟢 Successfully Login...", {
          position: "top-right",
          autoClose: 2000,
          icon: "✅", 
        });
  setTimeout(()=> {
    // Navigate to OTP Verification component with email
    navigate("/otp-verification", { state: { email } });
    
  }, 2000);
      } else {
        throw new Error("User ID not found or invalid response from server");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // alert("Failed to log in. Please try again.");
      toast.error("❌ Login Failed! " + (error.response?.data?.message || error.message), {
              position: "top-right",
              autoClose: 3000,
              icon: "⚠️",
            });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Seller Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
