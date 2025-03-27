import React, { useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "/Logo.png";
import desktopFrontPage from "/background.jpg";
import mobileFrontPage from "/phone.png";
import ceo from '/sudhakar.png'
import "../App.css";  
import axios from "axios";
import sellerImage from "/background.jpg";
import userAppImage from "/phone.png";
import deliveryAppImage from "/phone.png";
import { FaStore, FaShoppingCart, FaTruck } from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";

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

    useEffect(() => {
        const updateBackground = () => {
            if (window.innerWidth < 768) {
                setBgImage(mobileFrontPage); // Set the mobile image
            } else {
                setBgImage(desktopFrontPage); // Set the desktop image
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);

        return () => window.removeEventListener("resize", updateBackground);
    }, []);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [userRes, sellerRes, productRes, orderRes] = await Promise.all([
                    axios.get( `${BASE_URL}/user/count`),
                    axios.get( `${BASE_URL}/sellerdata/sellers/count`),
                    axios.get( `${BASE_URL}/product/product/count`),
                    axios.get(`${BASE_URL}/api/orders`),
                     
                ]);

console.log(userRes, sellerRes, productRes, orderRes);
                setStats({
                    users: userRes.data.count,
                    sellers: sellerRes.data.count,
                    products: productRes.data.count,
                    orders: orderRes.data.count
                });
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchCounts();
    }, []);



    return (
        <div>
            {/* Navbar */}
            <nav className="w-full px-8 py-2 fixed top-0 left-0 z-50 flex justify-between items-center backdrop-blur-lg">
                <div className="flex items-center">
                    <img className="h-14 w-16" src={Logo} alt="Logo" />
                    <span className="ml-3 text-2xl md:text-4xl font-bold text-yellow-400">LocalEStartup</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    {[
                        { label: "Home", id: "home" },
                        { label: "About Us", id: "about" },
                        { label: "Services", id: "services" },
                        { label: "Contact", id: "contact" },
                    ].map(({ label, id }, index) => (
                        <a
                            key={index}
                            href={`#${id}`}
                            className={`relative text-lg font-medium transition duration-300 text-gray-900 px-4 py-2 rounded-lg ${location.hash === `#${id}` ? "bg-yellow-500 text-white font-bold" : "hover:bg-yellow-400 hover:text-white"}`}
                        >
                            {label}
                        </a>
                    ))}
                </div>
                <button className="md:hidden text-gray-900" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden">
                        {[
                            { label: "Home", id: "home" },
                            { label: "About Us", id: "about" },
                            { label: "Services", id: "services" },
                            { label: "Contact", id: "contact" }
                        ].map(({ label, id }, index) => (
                            <a key={index} href={`#${id}`} className="text-lg font-medium text-gray-900 px-4 py-2 rounded-lg hover:bg-orange-400 hover:text-white transition duration-300" onClick={() => setIsOpen(false)}>
                                {label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <div
            id="home"
            className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center px-8 md:px-16 lg:px-32 text-black"
            // style={{ backgroundImage: `url(${bgImage})` }}
            style={{ backgroundImage: `url("https://res.cloudinary.com/dlfan4caj/image/upload/v1742983285/background_cjof2j.jpg")` }}
        >
                {/* <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-1xl  mx-auto md:mx-0"
                >
                    <h1 className="text-4xl md:text-6xl font-bold">
                        Boost Your Local Business with LocalEStartup!
                    </h1>
                    <p className="mt-4 text-lg md:text-xl">
                        Join a thriving marketplace where local businesses connect with customers effortlessly.
                    </p>
                
                </motion.div> */}
            </div>

            {/* About Section */}
            <section id="about" className="pt-36 pb-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center md:items-start">
                    <div className="w-full text-center md:hidden mb-6">
                        <h2 className="text-4xl font-bold text-yellow-400">About Us</h2>
                    </div>

                    
                    {/* <div className="md:w-1/3 flex flex-col items-center md:items-start">
                        <img
                            // src={ceo}
                            src="https://res.cloudinary.com/dlfan4caj/image/upload/v1742983651/sudhakar_afqftl.png"
                            alt="CEO Sudhakar"
                            className="w-[30vw] max-w-[200px] md:max-w-[250px] lg:max-w-[300px] custom-white-shadow "
                        />
                        <div className="mt-4 text-center md:ml-20">
                            <h3 className="text-2xl font-bold text-yellow-400">Sudhakar</h3>
                            <p className="text-lg text-gray-600">Founder & CEO</p>
                        </div>
                    </div> */}


                    <div className="md:w-1/3 flex flex-col items-center md:items-start">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-[300vw] max-w-[200px] md:max-w-[250px] lg:max-w-[350px] "
                        />
                    </div>


                    <div className="md:w-2/3 text-center md:text-left md:pl-12 mt-6 md:mt-0">
                        <h2 className="hidden md:block text-4xl font-bold text-yellow-400">About Us</h2>
                        <p className="mt-4 text-lg text-gray-700 text-justify">
                            LocalEStartup was created on <strong>December 17, 2025</strong>, to help small businesses grow by connecting them with more customers online.
                            Many local sellers struggle to reach people because they lack an online presence. Our platform gives them a simple way to showcase
                            their products and expand their business.
                            <br /><br />
                            By supporting small businesses, we help create jobs and boost the local economy. Customers also benefit by getting unique,
                            high-quality products directly from trusted sellers at fair prices.
                            <br /><br />
                            We use modern technology to make buying and selling easy.
                            Our goal is to build a community where small businesses can compete in the digital world and grow without limits.
                            LocalEStartup is more than a marketplace – it’s a step toward a better future for local businesses.
                        </p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
              <section  className="py-16 text-center bg-blue-50">
            <h2 className="text-4xl font-bold text-yellow-400">Our Growing Community</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              
                {[
    { label: "Users", count: stats?.users ?? 0 },
    { label: "Sellers", count: stats?.sellers ?? 0 },
    { label: "Products", count: stats?.products ?? 0 },
    { label: "Orders Delivered", count: stats?.orders ?? 0 }
].map((stat, index) => (
    <motion.div key={index} whileHover={{ scale: 1.1 }} className="bg-white shadow-lg p-6 rounded-lg">
        <h3 className="text-2xl font-bold">{stat.count.toLocaleString()}+</h3>
        <p className="text-gray-600">{stat.label}</p>
    </motion.div>
))}

            </div>
        </section>
     

        <section id="services"className="">

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
              href="/selling" 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="mt-6 inline-block bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-mdtransition"
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
  onClick={() => handleDownload("/apps/user-app.apk")} 
  variants={buttonVariants}
  whileHover="hover"
  whileTap="tap"
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
  onClick={() => handleDownload("/apps/delivery-app.apk")} 
  variants={buttonVariants}
  whileHover="hover"
  whileTap="tap"
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
