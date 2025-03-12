

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaStore, FaShoppingCart, FaRupeeSign, FaBoxOpen } from "react-icons/fa";

// const BASE_URL = "http://localhost:3000";
const BASE_URL ="https://localestartup-backend.onrender.com";

const AdminDashboard = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [sellerCount, setSellerCount] = useState(0);
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("adminUser"));
    if (!sessionData || !sessionData.token) {
      setMessage("No valid session found. Redirecting to login...");
      setTimeout(() => navigate("/adminlogin"), 2000);
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime - sessionData.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("adminSession");
      setMessage("Session expired. Please log in again.");
      setTimeout(() => navigate("/adminlogin"), 2000);
      return;
    }

    setStatus("success");

    // Fetch seller count
    const fetchSellerCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sellerdata/sellers/count`);
        setSellerCount(response.data.count);
      } catch (error) {
        console.error("Error fetching seller count:", error);
      }
    };

    fetchSellerCount();
  }, [navigate]);

  useEffect(() => {
    // Fetch user count
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/count`);
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/product/count`);
        setProductCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchProductCount();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center ">
      {status === "loading" ? (
        <p className="text-gray-600">{message || "Loading..."}</p>
      ) : (
        <div className="w-full max-w-6xl p-6">
          <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Dashboard Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-center justify-center">
            <StatCard title="Total Users" value={userCount} icon={<FaUsers className="text-blue-500" />} />
            <StatCard title="Total Sellers" value={sellerCount} icon={<FaStore className="text-green-500" />} />
            <StatCard title="Orders" value="0" icon={<FaShoppingCart className="text-orange-500" />} />
            <StatCard title="Revenue" value="₹0" icon={<FaRupeeSign className="text-purple-500" />} />
            <StatCard title="Products" value={productCount} icon={<FaBoxOpen className="text-yellow-500" />} />
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="text-5xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboard;
