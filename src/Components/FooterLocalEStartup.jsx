import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaCommentDots,
  FaMapMarkerAlt,
  FaHandsHelping  ,
} from "react-icons/fa";
import { motion } from "framer-motion";
const BASE_URLS = import.meta.env.VITE_BASE_URL;

// Handlers
const handleCall = () => {
  const phoneNumber = "+917092238804";
  if (window.confirm(`Do you want to call ${phoneNumber}?`)) {
    window.location.href = `tel:${phoneNumber}`;
  }
};
const handleEmail = () => {
  window.location.href =
    "mailto:localestartup@gmail.com?subject=Support Request";
};
const handleWhatsApp = () => {
  const whatsappNumber = "+917092238804";
  window.open(`https://wa.me/${whatsappNumber}`, "_blank");
};
const handleLocation = () => {
  window.open("https://maps.app.goo.gl/W5TJEBhgYtCZ4D6H6", "_blank");
};

const FooterLocalEStartup = () => {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validation function
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(`${BASE_URLS}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.message || "Error submitting feedback");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };
  return (
    <section id="contact" className="bg-gray-100 py-16 px-6 md:px-16 lg:px-32">
      <h2 className="text-3xl font-bold text-sky-400 text-center">
        Contact Us
      </h2>
      <p className="text-gray-600 text-center mt-4">
        Need help or want to share feedback? Reach out to us anytime.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-1 gap-10">
        {/* LEFT: Support Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            
            {/* Support text */}
            <h3 className="text-xl font-bold text-violet-700 text-center mb-2">Support</h3>
          <FaHandsHelping className="text-yellow-500 w-8 h-8" />
            {/* Phone Row */}
            <div className="flex items-center w-full justify-center mb-3">
              <FaPhoneAlt className="w-8 h-8 text-blue-500 mr-3" />
              <a
                href="tel:+917092238804"
                className="text-blue-600 font-semibold hover:underline"
                onClick={handleCall}
              >
                +91 70922 38804
              </a>
            </div>

            {/* Email Row */}
            <div className="flex items-center w-full justify-center mb-4">
              <FaEnvelope className="w-8 h-8 text-green-500 mr-3" />
              <span
                className="text-green-600 font-semibold cursor-pointer hover:underline"
                onClick={handleEmail}
              >
                localestartup@gmail.com
              </span>
            </div>

          </motion.div>




          {/* WhatsApp Chat */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={handleWhatsApp}
          >
            <FaCommentDots className="w-10 h-10 text-purple-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">Live Chat</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Chat with our support team instantly.
            </p>
            <button className="mt-3 bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700">
              Start Chat
            </button>
          </motion.div>
        </div>

        {/* RIGHT: Feedback Form */}
         <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Any Queries or Feedback?
      </h3>
      {!submitted ? (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="bg-green-100 text-green-700 p-6 rounded-lg text-center">
          🎉 Thank you for your feedback! We'll get back to you soon.
        </div>
      )}
    </div>
      </div>
    </section>
  );
};

export default FooterLocalEStartup;
