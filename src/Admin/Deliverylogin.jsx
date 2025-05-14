import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const DeliveryBoyLogin = () => {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  


  const handleLogin = async () => {
    if (!email || !dob) {
      alert("Please enter email and date of birth");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/deliveryboys/login`, {
        email,
        dob, // Ensure this is in "YYYY-MM-DD" format
      });
  
      console.log("Response:", response.data);
  
      // Handle different responses from the backend
      if (response.data.success) {
        alert("✅ Login successful!");
        setEmail("");
        setDob("");
        window.location.href = "/";
      } 
    } catch (error) {
      // If error response exists, extract message
      if (error.response) {
        const { status, data } = error.response;
  
        // Handle different backend error messages
        switch (status) {
          case 400:
            alert("⚠️ " + data.message); // Missing email or DOB
            break;
          case 401:
            alert("❌ Invalid credentials. Please check your email and date of birth.");
            break;
          case 403:
            alert("⏳ " + data.message); // Not verified by admin
            break;
          case 500:
            alert("🚨 Server error. Please try again later.");
            break;
          default:
            alert("⚠️ Something went wrong. Please try again.");
        }
  
      } else {
        console.error("Error:", error.message);
        alert("⚠️ Network error. Check your internet connection.");
      }
    }
    setLoading(false);
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Delivery Boy Login</h2>
      <input
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-4"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-4"
        placeholder="Date of Birth (YYYY-MM-DD)"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button
        className="w-full max-w-md bg-blue-500 py-2 rounded-lg text-white font-bold"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default DeliveryBoyLogin;
