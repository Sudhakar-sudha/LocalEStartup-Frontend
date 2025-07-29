import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

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

const FooterLocalEStartup = () => {
  return (
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
  )
}

export default FooterLocalEStartup