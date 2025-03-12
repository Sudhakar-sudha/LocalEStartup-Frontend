


import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

const AdminSideBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to track dropdown visibility
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Toggle product dropdown
  const handleProductClick = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  // Close sidebar on mobile when a link is clicked
  const handleNavClick = () => {
    if (window.innerWidth < 768 && toggleSidebar) {
      toggleSidebar();
    }
  };

  // Automatically open the product dropdown if inside /admin/products/*
  React.useEffect(() => {
    if (location.pathname.startsWith("/admin/products")) {
      setIsProductsOpen(true);
    } else {
      setIsProductsOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/adminlogin", { replace: true });
  };

  return (
    <div className="w-72 bg-blue-900 text-white h-screen flex flex-col shadow-lg relative transition-transform duration-300 ease-in-out overflow-y-auto">
      {/* Mobile Close Button */}
      {toggleSidebar && (
        <button
          className="absolute top-4 right-4 text-2xl text-gray-300 hover:text-red-500 transition duration-200 md:hidden"
          onClick={toggleSidebar}
        >
          <IoClose />
        </button>
      )}

      {/* Sidebar Header */}
      <div className="text-3xl p-4 font-bold border-b border-gray-600">
        Admin Dashboard
      </div>

      {/* Sidebar Links */}
      <ul className="flex flex-col px-6 py-6 space-y-4 flex-grow overflow-y-auto">
        <SidebarLink to="/admin/admindashboard" label="🏠 Dashboard" onClick={handleNavClick} />
        <SidebarLink to="/admin/sellerdetails" label="📜 Seller Details" onClick={handleNavClick} />
        <SidebarLink to="/admin/customerdetails" label="👤 Customer Details" onClick={handleNavClick} />
        <SidebarLink to="/admin/deliverydetails" label="🚚 Delivery Details" onClick={handleNavClick} />

        {/* Products Dropdown */}
        <div className="relative">
          <div
            className="text-lg ml-2 cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-blue-700"
            onClick={handleProductClick}
          >
            📦 Products
            <span className="ml-16">{isProductsOpen ? "⬆" : "⬇"}</span>

          </div>



          {isProductsOpen && (
            <ul className="rounded-lg py-2 pl-4">
              <SidebarLink to="/admin/products/pending" label="⏳ Pending Products" onClick={handleNavClick} />
              <SidebarLink to="/admin/products/approved" label="✔️ Approved Products" onClick={handleNavClick} />
              <SidebarLink to="/admin/products/rejected" label="❌ Rejected Products" onClick={handleNavClick} />
            </ul>
          )}
        </div>

        <SidebarLink to="/admin/orders" label="🛒 Orders" onClick={handleNavClick} />
        <SidebarLink to="/admin/payments" label="💰 Payments" onClick={handleNavClick} />
      </ul>

      {/* Fixed Logout Button at the Bottom */}
      <div className="p-4 bg-blue-900 sticky bottom-0 w-full">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-16 rounded-lg shadow-md transition duration-300 active:scale-95 w-full"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <NavLink
        to={to}
        className={`block py-2 px-4 text-lg rounded-md transition whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-700"
          }`}
        onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default AdminSideBar;
