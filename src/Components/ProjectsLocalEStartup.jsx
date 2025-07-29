import React from "react";
import { motion } from "framer-motion";

import sellerImage from "/seller.png";
import userAppImage from "/user.jpg";
import deliveryAppImage from "/delivery.jpg";
import { FaStore, FaShoppingCart, FaTruck } from "react-icons/fa";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const projects = [
  {
    title: "Become a Seller",
    image: sellerImage,
    icon: FaStore,
    iconColor: "text-yellow-400",
    description:
      "Start selling your products and reach thousands of customers. Get access to an easy-to-use dashboard with complete order management and analytics.",
    buttonText: "Start Selling",
    buttonColor: "bg-yellow-400 hover:bg-yellow-500",
    link: "/ecommerce"
  },
  {
    title: "Download User App",
    image: userAppImage,
    imageBg: "bg-gray-100",
    icon: FaShoppingCart,
    iconColor: "text-green-600",
    description:
      "Shop from verified local stores, enjoy exclusive deals, and get doorstep delivery with secure payment options.",
    buttonText: "Download User App",
    buttonColor: "bg-green-600 hover:bg-green-700",
    link: "/ecommerce"
  },
  {
    title: "Download Delivery App",
    image: deliveryAppImage,
    imageBg: "bg-gray-100",
    icon: FaTruck,
    iconColor: "text-orange-600",
    description:
      "Earn by delivering products with real-time tracking and easy payouts. Become a trusted delivery partner.",
    buttonText: "Download Delivery App",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    link: "/ecommerce"
  }
];

const ProjectsLocalEStartup = () => {
  return (
    <section id="Projects" className="bg-sky-50">
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mt-14">
          Empower Your Business with LocalEStartup
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Join our platform to experience seamless selling, shopping, and delivery solutions.
          We ensure a secure, fast, and user-friendly experience for everyone.
        </p>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              {/* Image */}
              <div className={`flex justify-center ${project.imageBg || ""}`}>
                <img src={project.image} alt={project.title} className="w-auto h-56 object-cover" />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <project.icon className={`${project.iconColor} text-5xl mx-auto mb-4`} />
                <h2 className="text-2xl font-bold text-yellow-400">{project.title}</h2>
                <p className="mt-4 text-gray-600">{project.description}</p>
                <motion.a
                  href={project.link}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-block ${project.buttonColor} text-white px-6 py-3 rounded-lg shadow-md transition`}
                >
                  {project.buttonText}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsLocalEStartup;
