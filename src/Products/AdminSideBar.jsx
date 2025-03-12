


import React from "react";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminSideBar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    // Retrieve token from localStorage
    const sessionData = JSON.parse(localStorage.getItem("sellerUser"));
    const token = sessionData?.token;

    if (!token) {
      alert("No token found! Logging out.");
      localStorage.removeItem("sellerUser");
      navigate("/sellerlogin", { replace: true });
      return;
    }

    // Alert token (for debugging)
    alert(`Logging out with token: ${token}`);

    try {
      // Send request to backend to delete token
      await axios.post(`${BASE_URL}/sellerdata/logout`, { token });

      // Clear user session
      localStorage.removeItem("sellerUser");

      // Redirect to login page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error.response?.data?.message || error.message);
      alert("Logout failed! Please try again.");
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen overflow-y-auto shadow-lg relative">
      {/* Close Button - Only on Mobile */}
      <button
        className="absolute top-4 right-4 text-2xl text-white hover:text-gray-400 md:hidden"
        onClick={toggleSidebar}
      >
        <IoClose />
      </button>

      {/* Sidebar Header */}
      <div className="text-2xl p-5 font-bold border-b border-gray-600">
        Seller Dashboard
      </div>

      {/* Sidebar Links */}
      <ul className="flex flex-col p-6 space-y-4">
        <SidebarLink to="/seller/dashboard" label="🏠 Home" toggleSidebar={toggleSidebar} />
        <SidebarLink to="/seller/details" label="📜 Seller Details" toggleSidebar={toggleSidebar} />
        <SidebarLink to="/seller/add-products" label="➕ Add Products" toggleSidebar={toggleSidebar} />
        <SidebarLink to="/seller/view-products" label="👀 View Products" toggleSidebar={toggleSidebar} />
        <SidebarLink to="/seller/update-products" label="✏️ Update Product" toggleSidebar={toggleSidebar} />
        <SidebarLink to="/seller/ordered-products" label="📦 Ordered Products" toggleSidebar={toggleSidebar} />
        <SidebarLink to="/seller/delivery" label="🚚 Delivery Status" toggleSidebar={toggleSidebar} />

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 active:scale-95"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ to, label, toggleSidebar }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block py-2 px-4 text-lg rounded-md transition ${isActive ? "bg-yellow-500 text-black font-semibold" : "hover:bg-gray-700"
        }`
      }
      onClick={() => {
        if (window.innerWidth < 768) toggleSidebar(); // Close sidebar on mobile
      }}
    >
      {label}
    </NavLink>
  </li>
);

export default AdminSideBar;
