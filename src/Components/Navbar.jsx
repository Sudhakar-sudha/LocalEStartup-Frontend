import React from "react";
import { Link } from "react-router-dom"
import Logo from '/Logo.png'
const Navbar = ({ setShowLogin }) => {
  return (
    <nav className="text-black bg-blue-700">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-24 w-24" src={Logo} alt="Logo" />
            <span className="ml-3 text-4xl text-white font-bold">LocalEStartup</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-10">



            <button
              onClick={() => setShowLogin(true)}
              className="relative group px-2 mx-8 py-2 text-white text-xl transition duration-300"
            >
              Login
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>


            <Link
              to="/register"
              className="px-6 py-2 mx-8 text-white text-xl transition duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-600"
            >
              Register
            </Link>



          </div>


        </div>
      </div>
    </nav>
  );
};


export default Navbar;