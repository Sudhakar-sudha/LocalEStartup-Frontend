


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon for mobile menu
import Logo from "/Logo.png";

const Navbar = ({ setShowLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img className="h-14 w-14" src={Logo} alt="Logo" />
            <span className="ml-3 text-2xl md:text-3xl font-bold">LocalEStartup</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            <button
              onClick={() => setShowLogin(true)}
              className="relative group px-4 py-2 text-lg transition duration-300"
            >
              Login
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>

            <Link
              to="/register"
              className="px-6 py-2 text-lg bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 flex flex-col items-center">
            <Link
              to="/sellerlogin"

              onClick={() => {
                // setShowLogin(true);
                setIsOpen(false);
              }}
              className="block w-full text-center px-4 py-2 text-lg hover:bg-yellow-500 transition duration-300 rounded-md"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="block w-full text-center px-6 py-2 text-lg bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
 
export default Navbar;
