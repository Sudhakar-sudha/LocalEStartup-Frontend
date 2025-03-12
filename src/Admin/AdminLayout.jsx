import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar - Toggleable */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:w-64`}>
        <AdminSideBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Navbar for Mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-blue-900 text-white fixed top-0 w-full z-50">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <IoClose className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
          <span className="text-lg font-bold">Admin Dashboard</span>
        </div>

        {/* Overlay (Mobile) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        {/* Main Content Area */}
        <div className="mt-14 md:mt-0 p-6 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;