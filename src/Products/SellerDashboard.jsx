

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SellerContext } from "./SellerContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBox, FaShoppingCart, FaCheckCircle, FaPlus } from "react-icons/fa";

// const BASE_URL = "http://localhost:3000";
const BASE_URL ="https://localestartup-backend.onrender.com";

const SellerDashboard = () => {
  const { seller, setSeller } = useContext(SellerContext);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    ordersDelivered: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("sellerUser"));

    if (!sessionData || !sessionData.token) {
      setMessage("No valid session found. Redirecting to login...");
      setTimeout(() => navigate("/sellerlogin"), 3000);
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime - sessionData.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("sellerUser");
      setMessage("Session expired. Please log in again.");
      setTimeout(() => navigate("/sellerlogin"), 3000);
      return;
    }

    setSeller(sessionData.user);
    setStatus("success");
  }, [navigate, setSeller]);

  useEffect(() => {
    if (!seller || !seller.id) {
      return;
    }

    const fetchProductsBySeller = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/product/sellerproductcount/${seller.id}`);
        setProducts(response.data.products);
        setProductCount(response.data.productCount);
      } catch (error) {
        console.error("\ud83d\udea8 Error fetching products:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "Error fetching products");
      }
    };

    fetchProductsBySeller();
  }, [seller]);

  return (
    <div className="flex flex-col">
      {/* Dashboard Header */}
      <div className="py-4 px-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Seller Dashboard</h2>
        {status === "success" && seller && (
          <h3 className="text-3xl font-semibold text-gray-700 flex items-center">
            <span className="text-yellow-500 text-3xl mr-2">👋</span>
            {seller.name}
          </h3>
        )}
      </div>

      {/* Dashboard Stats Section */}
      <div className="flex-1 p-6 flex justify-center">
        {status === "loading" && (
          <div className="text-lg text-gray-600">Loading user data...</div>
        )}
        {status === "error" && (
          <div className="text-red-500 text-lg">❌ {message}</div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {/* Total Products Card */}
            <motion.div
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center h-40"
              whileHover={{ scale: 1.05 }}
            >
              <FaBox className="text-blue-500 text-5xl mb-2" />
              <h4 className="text-gray-700 text-lg font-semibold">Total Products</h4>
              <p className="text-2xl font-bold text-blue-600">{productCount}</p>
            </motion.div>

            {/* Total Orders Card */}
            <motion.div
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center h-40"
              whileHover={{ scale: 1.05 }}
            >
              <FaShoppingCart className="text-green-500 text-5xl mb-2" />
              <h4 className="text-gray-700 text-lg font-semibold">Total Orders</h4>
              <p className="text-2xl font-bold text-green-600">{stats.totalOrders}</p>
            </motion.div>

            {/* Orders Delivered Card */}
            <motion.div
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center h-40"
              whileHover={{ scale: 1.05 }}
            >
              <FaCheckCircle className="text-purple-500 text-5xl mb-2" />
              <h4 className="text-gray-700 text-lg font-semibold">Orders Delivered</h4>
              <p className="text-2xl font-bold text-purple-600">{stats.ordersDelivered}</p>
            </motion.div>

            <div className="flex justify-between items-center mb-6">
              <button onClick={() => navigate("/seller/add-products")} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                <FaPlus className="mr-2" /> Add Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
