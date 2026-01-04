import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Ecommerce Platform",
    type: "Product",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203759/localestartupe_cabyfj.png",
    description:
      "LocalEStartup is an all-in-one platform where sellers can manage products and orders, customers can shop from trusted local stores with secure payments and fast delivery.",
    tags: ["MERN Stack", "RazerPay", "React Native", "TailwindCSS", "Admin Dashboard"],
    demoLink: "https://localestartup.vercel.app/ecommerce",
    githubLink: "https://github.com/Sudhakar-sudha",
  },

  {
    title: "Amirthan Oil",
    type: "Live Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203350/AmirthanOil_pigwy4.png",
    description:
      "Displays various oil products with order checkout, invoice generation, Razorpay payment integration, and a full admin dashboard.",
    tags: ["MERN Stack", "Razorpay", "Admin Dashboard", "Invoice Generation","Stock Management","Order Tracking"],
    demoLink: "https://amirthanoil.vercel.app/",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "VPrintTech Offset",
    type: "Live Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203772/vprinttech_f7nggk.png",
    description:
      "V Print Tech is a MERN stack-based printing offset website showcasing printing services, allowing customers to explore and connect easily.",
    tags: ["MERN Stack", "TailwindCSS"],
    demoLink: "https://vprinttech.netlify.app/",
    githubLink: "https://github.com/Sudhakar-sudha",
  },

  {
    title: "Tancet Quiz Website",
    type: "Live Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203758/tancet_ynnaia.png",
    description:
      "A secure TANCET Quiz platform with instant scoring, winner display, and anti-cheat features. Auto-submits answers with a running timer.",
    tags: ["MERN Stack", "Tailwind"],
    demoLink: "https://tancetquiz.vercel.app",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "Pickbazar",
    type: "College Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767204235/pickbazar_kdyhfw.png",
    description:
      "Pickbazar is a MERN stack e-commerce Landing Page that allows users to browse products, place orders, and manage their shopping experience seamlessly.",
    tags: ["React", "TailwindCSS"],
    demoLink: "https://project-tptk.onrender.com",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "Aibaik Restaurant",
    type: "College Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203351/Aibaik_wm01xu.png",
    description:
      "Restaurant menu listing with food ordering, table reservation, email verification, notifications, and secure payment integration using Razorpay.",
    tags: ["MERN Stack", "TailwindCSS", "Razorpay", "Email OTP Verificaiton"],
    demoLink: "https://aibaik.vercel.app",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "Star GYM",
    type: "College Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203350/Start_Gym_zuuwiw.png",
    description:
      "Gym equipment and nutrition product ordering system with trainer booking functionality.",
    tags: ["MERN Stack", "TailwindCSS", "Booking System", "Invoice Generation"],
    demoLink: "https://nstargym.vercel.app",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "JSS Crackers Website",
    type: "College Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1767203773/jsscrackers_vsocnr.png",
    description:
      "A Crackers Website built using HTML, CSS, and JS that allows users to browse, select, and purchase various firecrackers online with a responsive design.",
    tags: ["HTML", "CSS", "JavaScript"],
    demoLink: "https://sudhakar-portfolio.vercel.app/jsscrackers",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
];

const ProjectsLocalEStartup = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="Projects" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold  text-blue-500 mb-5">
            Projects
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A showcase of web applications and digital solutions I've built
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Project Type Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-gray-700">{project.type}</span>
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end justify-center pb-6 px-6 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <div className="flex gap-3 w-full">
                    {project.demoLink ? (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 bg-gray-400/50 text-white px-4 py-3 rounded-xl font-semibold cursor-not-allowed">
                        <FaExternalLinkAlt className="text-sm" />
                        <span className="text-sm">Coming Soon</span>
                      </div>
                    )}
                    {/* <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="text-sm" />
                      <span className="text-sm">GitHub</span>
                    </a> */}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectsLocalEStartup;