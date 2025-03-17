import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"
import SlideShow from "./SlideShow";
import Login from "./Login";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomeSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [sellerCount, setSellerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const slides = [
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide1seller_xe3f8g.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide2seller_mqhw7r.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide3seller_cphmwv.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide4seller_tv32ju.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide5seller_e2cyam.png",
    "https://res.cloudinary.com/dlfan4caj/image/upload/v1741858323/slide6seller_j7tczj.png",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellers, users, products, orders] = await Promise.all([
          axios.get(`${BASE_URL}/sellerdata/sellers/count`),
          axios.get(`${BASE_URL}/user/count`),
          axios.get(`${BASE_URL}/product/product/count`),
          // axios.get(`${BASE_URL}/orders/count`),
        ]);

        setSellerCount(sellers.data.count);
        setUserCount(users.data.count);
        setProductCount(products.data.count);
        // setOrderCount(orders.data.count);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();
  }, []);

  return (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
<Navbar setShowLogin={setShowLogin} />
<div className="flex">
  <SlideShow slides={slides} />
  <motion.div className="w-1/2 h-screen flex items-center justify-center" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
    {!showLogin ? (
      <div className="p-10 text-xl">
        <motion.h1 className="text-4xl font-bold text-blue-700" whileHover={{ scale: 1.1 }}>Start Selling on LocalEStartup</motion.h1>
        <motion.p className="mt-4 text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        Login or register as a seller on  LocalEStartup  , with your basic details like name, email, phone number, and bank information. List your products by adding their name, price, description, stock, and high-quality images. Choose a delivery method—either handled by LocalEStartup or managed by you. Once your products are live, customers can easily purchase them, and you can track orders through the dashboard. Payments are securely transferred to your bank account. Keep your listings updated and respond to customer inquiries to ensure smooth sales. 
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link to="/register" className="mt-6 inline-block px-6 py-3 text-white bg-orange-500 rounded-lg text-2xl shadow-lg hover:bg-orange-600">Start Selling</Link>
        </motion.div>
      </div>
    ) : (
      <Login />
    )}
  </motion.div>
</div>


   {/* About Section */}
   <section className="py-16 bg-gray-100">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-blue-700">About LocalEStartup</h2>
    
    <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
      LocalEStartup was born in <strong>December 2024</strong> with a vision to 
      <strong> revolutionize local commerce</strong> by empowering small businesses and emerging startups. 
      Our platform bridges the gap between <strong>local sellers</strong> and a 
      <strong> vast digital marketplace</strong>, enabling them to <strong>expand their reach, 
      grow their business, and connect with customers effortlessly</strong>.
    </p>

    {/* Key Features Section */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Empowering Local Sellers */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900">🚀 Empowering Local Sellers</h3>
        <p className="mt-2 text-gray-600 text-sm">
          We provide a hassle-free and cost-effective platform to showcase and sell products online.
        </p>
      </div>

      {/* Secure & Reliable Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900">🔒 Secure & Reliable Transactions</h3>
        <p className="mt-2 text-gray-600 text-sm">
          With robust payment security and trusted logistics, both sellers and buyers enjoy a smooth experience.
        </p>
      </div>

      {/* Seamless Order Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900">📦 Seamless Order Management</h3>
        <p className="mt-2 text-gray-600 text-sm">
          From listing products to tracking deliveries, we simplify every step of the selling process.
        </p>
      </div>

      {/* Supporting Growth & Innovation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900">🎯 Supporting Growth & Innovation</h3>
        <p className="mt-2 text-gray-600 text-sm">
          We are not just a marketplace; we are a startup enabler, helping small businesses scale efficiently.
        </p>
      </div>
      
    </div>

    <p className="mt-8 text-gray-700 text-lg">
      Join <strong>LocalEStartup</strong> and be part of the <strong>next wave of digital commerce!</strong> 🌍✨
    </p>
  </div>
</section>


{/* Statistics Section */}
<motion.section className="py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
  <h2 className="text-4xl font-bold text-blue-700">Our Impact</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 text-gray-800">
    {[{ label: "Users", count: userCount }, { label: "Sellers", count: sellerCount }, { label: "Products", count: productCount }, { label: "Orders Delivered", count: orderCount }].map((item, index) => (
      <motion.div key={index} className="bg-white p-6 shadow-lg rounded-lg" whileHover={{ scale: 1.05 }}>
        <h3 className="text-3xl font-bold">{item.count}+</h3>
        <p className="mt-2">{item.label}</p>
      </motion.div>
    ))}
  </div>
</motion.section>

{/* Vision, Goals, Features */}
<motion.section className="py-16 bg-gray-200 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
  <h2 className="text-4xl font-bold text-blue-700">Our Vision & Goals</h2>
  <div className="grid md:grid-cols-2 gap-8 mt-6 max-w-5xl mx-auto">
    {[{ title: "Vision", text: "Create a thriving marketplace for small businesses to grow online." }, { title: "Goals", text: "Support 1M sellers by 2026, streamline logistics, and improve customer experience." }].map((item, index) => (
      <motion.div key={index} className="bg-white p-6 shadow-lg rounded-lg" whileHover={{ scale: 1.05 }}>
        <h3 className="text-2xl font-bold text-orange-500">{item.title}</h3>
        <p className="mt-4 text-gray-700">{item.text}</p>
      </motion.div>
    ))}
  </div>
</motion.section>


<footer className="bg-gray-900 text-white py-12 ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Footer Content - 4 Columns in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About LocalEStartup</h2>
            <p className="text-gray-400 text-sm">
              LocalEStartup empowers small businesses by providing a digital marketplace. 
              Established in December 2024, we aim to bridge the gap between local sellers and global customers.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">Sivakasi, India</p>
            <p className="text-gray-400">Owner: Sudhakar</p>
            <p className="text-gray-400">Email: localestartup@gmail.com</p>
            <p className="text-gray-400">Phone: +91 7092238804</p>
          </div>

          {/* Social Media */}
          <div>
  <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
  <ul className="space-y-2">
    <li>
      <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
        <FaFacebook className="text-xl" />
        <span>Facebook</span>
      </a>
    </li>
    <li>
      <a href="#" className="flex items-center space-x-2 hover:text-blue-500">
        <FaTwitter className="text-xl" />
        <span>Twitter</span>
      </a>
    </li>
    <li>
      <a href="#" className="flex items-center space-x-2 hover:text-red-500">
        <FaInstagram className="text-xl" />
        <span>Instagram</span>
      </a>
    </li>
    <li>
      <a href="#" className="flex items-center space-x-2 hover:text-blue-600">
        <FaLinkedin className="text-xl" />
        <span>LinkedIn</span>
      </a>
    </li>
  </ul>
</div>


          {/* Google Map */}
          <div className="flex justify-center md:justify-end">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d374.12555601533984!2d77.79610589012263!3d9.446079213570789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1svellansamiyar%20street%20sivakasi!5e0!3m2!1sen!2sin!4v1741860218809!5m2!1sen!2sin"
              width="300"
              height="200"
              title="Location"
              className="rounded-lg shadow-lg"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-white text-sm mt-6 border-t border-gray-700 pt-4">
          © 2025 LocalEStartup. All rights reserved.
        </div>
      </div>
    </footer>

</motion.div>
  );
};

export default HomeSection;