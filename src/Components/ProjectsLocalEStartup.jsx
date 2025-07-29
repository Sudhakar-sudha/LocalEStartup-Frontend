import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import sellerImage from "/seller.png";
import userAppImage from "/user.jpg";
import deliveryAppImage from "/delivery.jpg";
import LocalEStartup from "/LocalEStartup.png";
import TancetQuiz from "/TancetQuiz.png";
import Vprinttech from "/Vprinttech.png";
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
    title: "Ecommerce Platform",
    type: "Product",
    image: LocalEStartup,
    description:
      "LocalEStartup is an all-in-one platform where sellers can easily manage products and orders, customers can shop from trusted local stores with secure payments and fast delivery, and delivery partners can earn with flexible schedules and real-time tracking.",
    buttonText: "Start Selling",
    demoLink: "https://localestartup.vercel.app/ecommerce",
    githubLink: "https://github.com/Sudhakar-sudha",
    link: "/ecommerce"
  },
  {
    title: "Tancet Quiz Website",
    type: "Clg Project",
    image: TancetQuiz,
    imageBg: "bg-gray-100",
    description:
      "A secure TANCET Quiz platform with instant scoring, winner display, and strict anti-cheat features. Once started, the timer runs and auto-submits answers, ensuring a fair competition.",
    buttonText: "Download User App",
    demoLink: "https://tancetquiz.vercel.app",
    githubLink: "https://github.com/Sudhakar-sudha",
    link: "/ecommerce"
  },
  {
    title: "VPrintTech Offset",
    type: "Live Project",
    image: Vprinttech,
    imageBg: "bg-gray-100",
    description:
      "V Print Tech is a MERN stack-based printing offset website developed in collaboration with Satheeshbabu. The platform showcases a wide range of offset printing services and allows customers to easily explore and interact with the services offered.",
    buttonText: "Download Delivery App",
    demoLink: "https://vprinttech.netlify.app/",
    githubLink: "https://github.com/Sudhakar-sudha",
    link: "/ecommerce"
  }
];

const ProjectsLocalEStartup = () => {
  return (
    <section id="Projects" className="bg-sky-50">
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <h1 className="text-4xl font-bold text-center text-sky-400 mt-8 ">
          Empower Your Business with LocalEStartup
        </h1>
         <h1 className="text-3xl font-bold text-center text-black mt-4 mb-8">
          Recently Finished Projects
        </h1>

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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-auto h-56 object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-sky-400">{project.title}</h2>

                {/* Project Type */}
                <p className="mt-1 text-sm text-gray-500 italic">
                  {project.type}
                </p>

                <p className="mt-4 text-gray-600">{project.description}</p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <motion.a
                    href={project.demoLink}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md transition"
                  >
                    <FaExternalLinkAlt /> Demo
                  </motion.a>

                  <motion.a
                    href={project.githubLink}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition"
                  >
                    <FaGithub /> GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsLocalEStartup;
