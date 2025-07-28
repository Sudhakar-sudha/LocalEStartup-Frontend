import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "/OriginalLogo.png";
import AllTech from "/sudha.png";
import "../App.css";
import axios from "axios";
import sellerImage from "/seller.png";
import userAppImage from "/user.jpg";
import deliveryAppImage from "/delivery.jpg";
import image from "/TeamLogo1.png";
import { FaStore, FaShoppingCart, FaTruck } from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";

import { ShoppingBag, Briefcase, Truck, TrendingUp } from "lucide-react";
import ParticlesBackground from "./ParticlesBackground";
// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 }
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const handleDownload = (apkPath) => {
  const userConfirmed = window.confirm("You are agreeing to download this app. Do you want to continue?");
  if (userConfirmed) {
    window.location.href = apkPath; // Redirect to local APK file
  }
};


// 📞 Call Function
const handleCall = () => {
  const phoneNumber = "+917092238804"; // Change this to your actual number
  if (window.confirm(`Do you want to call ${phoneNumber}?`)) {
    window.location.href = `tel:${phoneNumber}`;
  }
};

// 📩 Open Gmail
const handleEmail = () => {
  window.location.href = "mailto:localestartup@gmail.com?subject=Support Request";
};

// 💬 Open WhatsApp Chat
const handleWhatsApp = () => {
  const whatsappNumber = "+917092238804"; // Change this to your actual WhatsApp number
  window.open(`https://wa.me/${whatsappNumber}`, "_blank");
};

// 📍 Open Google Maps
const handleLocation = () => {
  window.open("https://maps.app.goo.gl/W5TJEBhgYtCZ4D6H6", "_blank"); // Update with exact location link
};


const LocalEStartup = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [bgImage, setBgImage] = useState("");
  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    products: 0,
    orders: 0
  });

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Close menu on mobile after click
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userRes, sellerRes, productRes, orderRes] = await Promise.all([
          axios.get(`${BASE_URL}/user/count`),
          axios.get(`${BASE_URL}/sellerdata/sellers/count`),
          axios.get(`${BASE_URL}/product/product/count`),
          axios.get(`${BASE_URL}/api/orders/count`), // ✅ Ensure correct endpoint
        ]);

        console.log("User Count:", userRes.data);
        console.log("Seller Count:", sellerRes.data);
        console.log("Product Count:", productRes.data);
        console.log("Order Count:", orderRes.data);

        setStats({
          users: userRes.data.count || 0,
          sellers: sellerRes.data.count || 0,
          products: productRes.data.count || 0,
          orders: orderRes.data.count || 0,
        });
      } catch (error) {
        console.error("❌ Error fetching statistics:", error.response?.data || error.message);
      }
    };

    fetchCounts();
  }, []);


  const staticText = "Your one-stop destination for ";
  const phrases = [
    "Real-Time Projects",
    "College Final Year Projects",
    "Technical Guidance"
  ];

  const [currentPhrase, setCurrentPhrase] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        // Typing letters
        if (charIndex < current.length) {
          setCurrentPhrase((prev) => prev + current[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          // Pause before deleting
          setDeleting(true);
        }
      } else {
        // Deleting letters
        if (charIndex > 0) {
          setCurrentPhrase((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Move to next phrase
          setDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, deleting ? 60 : 100); // speed: faster when deleting

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, phrases]);


  return (

    <div id="home">

      <nav className="hidden [@media(min-width:1310px)]:flex w-full px-8 py-0 fixed top-0 left-0 z-50 justify-between items-center  bg-white ">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-18 w-20 ml-24" src={Logo} alt="Logo" />
          {/* <span className="ml-3 text-2xl md:text-4xl font-bold text-[#1d86ff]">LocalEStartup</span> */}
        </div>

        {/* Desktop Menu (≥1440px) */}
        <div className="space-x-8">
          {[
            { label: "Home", id: "home" },
            { label: "About Us", id: "about" },
            { label: "Services", id: "services" },
            { label: "Projects", id: "Projects" },
            { label: "Training & Guidance", id: "TrainingandGuidance" },
            { label: "Join Freelancers", id: "Freelancers" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }, index) => (
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

      {/* Mobile Navbar (below 1440px) */}
      <nav className="flex [@media(min-width:1310px)]:hidden w-full px-6 py-2 fixed top-0 left-0 z-50 justify-between items-center bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-12 w-14 [@media(min-width:1024px)]:ml-24 ml-5 " src={Logo} alt="Logo" />
          {/* <span className="ml-2 text-xl font-bold text-[#8fb6e3]">LocalEStartup</span> */}
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
            {[
              { label: "Home", id: "home" },
              { label: "About Us", id: "about" },
              { label: "Services", id: "services" },
              { label: "Projects", id: "Projects" },
              { label: "Training & Guidance", id: "TrainingandGuidance" },
              { label: "Join Freelancer", id: "Freelancer" },
              { label: "Contact", id: "contact" },
            ].map(({ label, id }, index) => (
              <button
                key={index}
                onClick={() => handleScroll(id)}
                className="text-lg font-medium text-sky-500 px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-white transition duration-300"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>


      <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-32">

        {/* Particles Background */}
        <ParticlesBackground />
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6 md:mt-24 mt-24"
        >
          {/* Highlighted Animated Text */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-sky-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            LocalEStartup!
          </motion.h1>


          {/* Main Heading */}
          <motion.h1
            className="text-3xl md:text-3xl  text-black"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empowering Students & Businesses with
            <span className="text-yellow-500"> Innovative Projects </span>
          </motion.h1>

          {/* Sub-Heading */}
          <motion.h2
            className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {staticText}
            <span className="text-sky-500">{currentPhrase}</span>
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.h2>

          {/* Intro Paragraph */}
          <motion.p
            className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            We help
            <span className="font-medium text-yellow-500"> students</span>,
            <span className="font-medium text-blue-500">  businesses</span>, and
            <span className="font-medium text-green-500"> freelancers</span> bring their ideas to life.
            Whether you're a <span className="font-semibold">college student searching for your final year project</span>,
            a <span className="font-semibold">business looking for customized software solutions</span>,
            or someone who needs <span className="font-semibold">training & expert mentorship</span>,
            we’ve got you covered!
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Get Started
          </motion.button>


        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center  md:mt-20 md:ml-20 "
        >
          <img
            src={image}
            alt="Online Shopping"
            className="w-3/4 md:w-full max-w-xs md:max-w-md lg:max-w-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

      </div>

{/* About Section */}
<section id="about" className="pt-28 pb-28 bg-sky-50">
  <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row md:flex-col items-center md:items-center">
    
    {/* Mobile Heading */}
    <div className="w-full text-center lg:hidden mb-6">
      <h2
        className="relative inline-block text-4xl font-bold text-sky-500
          after:content-[''] after:block after:w-1/2 after:h-[3px] after:bg-white
          after:mt-1 after:mx-auto after:animate-underlineGrow">
        About Us
      </h2>
    </div>

    {/* Image Section */}
    <div className="md:w-1/3 flex justify-center md:justify-start items-center">
      <img
        src={AllTech}
        alt="Logo"
        className=""
      />
    </div>

    {/* Text Section */}
    <div className="md:w-2/3 text-center md:text-left md:pl-12 mt-6 md:mt-0 flex flex-col justify-center">
      <h2
        className="relative md:hidden lg:inline-block text-4xl font-bold text-sky-500">
        About Us
      </h2>
      <p className="mt-4 text-lg text-gray-700 text-justify">
        Hi, I'm <strong>Sudhakar</strong> – a passionate freelancer and software developer who loves building
        real-world solutions. My journey began on <strong>December 17, 2025</strong> while working on my
        college project. From that day onwards, I discovered my interest in creating and learning through
        hands-on projects.
        <br /><br />
        Currently, I work at a software company where I contribute to impactful projects and sharpen my
        technical skills. At the same time, I continue freelancing to explore new technologies and deliver
        value to businesses and individuals.
        <br /><br />
        Freelancing gives me the opportunity to work on diverse ideas, learn continuously, and build
        innovative solutions tailored to client needs. Whether it's web development, software solutions,
        or creating user-focused digital experiences – I love helping people bring their ideas to life.
        <br /><br />
        My mission is simple: <strong>learn, build, and grow – together with my clients</strong>. Every project
        I take on is a chance to make an impact and help others achieve their goals while enhancing my
        own expertise.
      </p>
    </div>
  </div>
</section>


      {/* Statistics Section */}
      <section className="py-16 text-center ">
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400">
          Our Growing Community
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 sm:px-16">
          {[
            { label: "Users", count: stats?.users ?? 0 },
            { label: "Sellers", count: stats?.sellers ?? 0 },
            { label: "Products", count: stats?.products ?? 0 },
            { label: "Orders Delivered", count: stats?.orders ?? 0 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold">{stat.count.toLocaleString()}+</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>



      <section id="services" className="bg-sky-50">

        <div className="px-6 md:px-16 lg:px-32 py-16">
          <h1 className="text-4xl font-bold text-center text-yellow-400 mb-12">
            Empower Your Business with LocalEStartup
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Join our platform to experience seamless selling, shopping, and delivery solutions.
            We ensure a secure, fast, and user-friendly experience for everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Seller Card (Desktop Image) */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img src={sellerImage} alt="Seller" className="w-full h-56 object-cover" />
              <div className="p-6 text-center">
                <FaStore className="text-yellow-400 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-yellow-400">Become a Seller</h2>
                <p className="mt-4 text-gray-600">
                  Start selling your products and reach thousands of customers. Get access to
                  an easy-to-use dashboard with complete order management and analytics.
                </p>
                <motion.a
                  href="/ecommerce"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-md transition"
                >
                  Start Selling
                </motion.a>

              </div>
            </motion.div>

            {/* User App Card (Phone Image) */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <div className="flex justify-center bg-gray-100">
                <img src={userAppImage} alt="User App" className="w-auto h-56" />
              </div>
              <div className="p-6 text-center">
                <FaShoppingCart className="text-green-600 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-yellow-400">Download User App</h2>
                <p className="mt-4 text-gray-600">
                  Shop from verified local stores, enjoy exclusive deals, and get doorstep
                  delivery with secure payment options.
                </p>

                <motion.a

                  href="/ecommerce"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  target="_blank"
                  className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  Download User App
                </motion.a>

              </div>
            </motion.div>

            {/* Delivery App Card (Phone Image) */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <div className="flex justify-center bg-gray-100">
                <img src={deliveryAppImage} alt="Delivery App" className="w-auto h-56" />
              </div>
              <div className="p-6 text-center">
                <FaTruck className="text-orange-600 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-yellow-400">Download Delivery App</h2>
                <p className="mt-4 text-gray-600">
                  Earn by delivering products with real-time tracking and easy payouts. Become
                  a trusted delivery partner.
                </p>

                <motion.a
                  href="/ecommerce"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  target="_blank"
                  className="mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
                >
                  Download Delivery App
                </motion.a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section id="contact" className="">
        <div className="px-8 md:px-14 lg:px-30 pt-14 pb-4   bg-gray-100">
          <h2 className="text-3xl font-bold text-yellow-400 text-center">Contact Us</h2>
          <p className="text-gray-600 text-center mt-4">
            Need help? Get in touch with our support team for assistance.
          </p>

          {/* Contact Options */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 📞 Customer Support */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              onClick={handleCall}
            >
              <FaPhoneAlt className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Customer Support</h3>
              <p className="text-gray-600 mt-2">For order issues, returns, and FAQs.</p>
              <a href="tel:+917092238804" className="mt-4 text-blue-600 font-semibold hover:underline">
                Call: +91 70922 38804
              </a>
            </motion.div>

            {/* 📩 Seller Support */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              onClick={handleEmail}
            >
              <FaEnvelope className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Seller Support</h3>
              <p className="text-gray-600 mt-2">Grow your business with us. Get assistance.</p>
              <a href="mailto:localestartup@gmail.com" className="mt-4 text-green-600 font-semibold hover:underline">
                Email: localestartup@gmail.com
              </a>
            </motion.div>

            {/* 💬 Live Chat */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              onClick={handleWhatsApp}

            >
              <FaCommentDots className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Live Chat</h3>
              <p className="text-gray-600 mt-2">Chat with our support team instantly.</p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700">
                Start Chat
              </button>
            </motion.div>
          </div>


          {/* 📍 Office Location */}
          <motion.div
            className="mt-12 bg-white p-6 rounded-lg shadow-md text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={handleLocation}
          >
            <FaMapMarkerAlt className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Our Office</h3>
            <p className="text-gray-600 mt-2">LocalEStartup Pvt Ltd, Sivakasi, India</p>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer id="contact" className="py-4 text-center bg-gray-800 text-white">
        <p>&copy; 2025 LocalEStartup. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LocalEStartup;
