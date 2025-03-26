


import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import SlideShow from "./SlideShow";
import Login from "./Login";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomeSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const slides = [
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide1seller_xe3f8g.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide2seller_mqhw7r.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide3seller_cphmwv.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide4seller_tv32ju.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide5seller_e2cyam.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide6seller_j7tczj.png",
  ];

  const navigate = useNavigate();

  // ✅ Check if the user is already logged in
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("sellerUser"));

    if (sessionData && sessionData.token) {
      // Redirect to dashboard
      toast.info("🔄 You are already logged in!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/seller"), 2000);
    }
  }, [navigate]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Navbar setShowLogin={setShowLogin} />
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 h-auto md:h-screen px-8 pt-10 md:p-0">
          <SlideShow slides={slides} />
        </div>
        <motion.div 
          className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {!showLogin ? (
            <div className="text-center md:text-left">
              <motion.h1 
                className="text-2xl md:text-4xl font-bold md:mt-40 text-blue-700"
                // whileHover={{ scale: 1.1 }}
              >
                Start Selling on LocalEStartup
              </motion.h1>
              <motion.p 
                className="mt-4 text-gray-700 text-sm md:text-lg "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Login or register as a seller on LocalEStartup with your basic details like name, email, phone number, and bank information. List your products by adding their name, price, description, stock, and high-quality images. Choose a delivery method—either handled by LocalEStartup or managed by you. Once your products are live, customers can easily purchase them, and you can track orders through the dashboard. Payments are securely transferred to your bank account.
              </motion.p>
              <motion.div
              //  whileHover={{ scale: 1.1 }} 
               className="mt-6">
                <Link 
                  to="/register" 
                  className="inline-block px-6 py-3 text-white bg-orange-500 rounded-lg text-lg md:text-2xl shadow-lg hover:bg-orange-600"
                >
                  Start Selling
                </Link>
              </motion.div>
            </div>
          ) : (
            <Login />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeSection;