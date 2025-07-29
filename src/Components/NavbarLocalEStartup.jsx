import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Assuming you're using Lucide or Heroicons
import Logo from "/OriginalLogo.png"; // adjust path to your logo

const Navbar = ({ handleScroll }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projects", id: "Projects" },
    { label: "Training & Guidance", id: "TrainingandGuidance" },
    { label: "Join Freelancers", id: "Freelancers" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Desktop Navbar (≥1310px) */}
      <nav className="hidden [@media(min-width:1310px)]:flex w-full px-8 py-0 fixed top-0 left-0 z-50 justify-between items-center bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-18 w-20 ml-24" src={Logo} alt="Logo" />
          <motion.h1
                   className="text-xl ml-3 md:text-2xl font-bold text-sky-500"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.8, delay: 0.3 }}
                 >
                   Freelancer
                 </motion.h1>
        </div>

        {/* Menu */}
        <div className="space-x-8">
          {navItems.map(({ label, id }, index) => (
            <button
              key={index}
              onClick={() => handleScroll(id)}
              className="relative text-lg font-medium transition duration-300 text-sky-500 px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar (<1310px) */}
      <nav className="flex [@media(min-width:1310px)]:hidden w-full px-6 py-2 fixed top-0 left-0 z-50 justify-between items-center bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="h-12 w-14 [@media(min-width:1024px)]:ml-24 ml-5"
            src={Logo}
            alt="Logo"
          />
           <motion.h1
                   className="text-xl ml-3 md:text-2xl font-bold text-sky-500"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.8, delay: 0.3 }}
                 >
                   Freelancer
                 </motion.h1>
        </div>

        {/* Menu Toggle */}
        <button className="text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4"
          >
            {navItems.map(({ label, id }, index) => (
              <button
                key={index}
                onClick={() => {
                  handleScroll(id);
                  setIsOpen(false);
                }}
                className="text-lg font-medium text-sky-500 px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-white transition duration-300"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
