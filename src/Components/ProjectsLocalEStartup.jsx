import React, { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import LocalEStartup from "/LocalEStartup.png";
import TancetQuiz from "/TancetQuiz.png";
import Vprinttech from "/Vprinttech.png";
import Crackers from "/Crackers.png";

const projects = [
  {
    title: "Ecommerce Platform",
    type: "Product",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1753888043/LocalEStartup_tu7s0f.png",
    description:
      "LocalEStartup is an all-in-one platform where sellers can manage products and orders, customers can shop from trusted local stores with secure payments and fast delivery.",
    demoLink: "https://localestartup.vercel.app/ecommerce",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "JSS Crackers Website",
    type: "Clg Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1753888090/Crackers_j4pimy.png",
    description:
      "A Crackers Website built using HTML, CSS, and JS that allows users to browse, select, and purchase various firecrackers online with a responsive design.",
    demoLink: "http://jsscrackers.infinityfreeapp.com",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "Tancet Quiz Website",
    type: "Clg Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1753888019/TancetQuiz_ldccny.png",
    description:
      "A secure TANCET Quiz platform with instant scoring, winner display, and anti-cheat features. Auto-submits answers with a running timer.",
    demoLink: "https://tancetquiz.vercel.app",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
  {
    title: "VPrintTech Offset",
    type: "Live Project",
    image: "https://res.cloudinary.com/dlfan4caj/image/upload/v1753888095/Vprinttech_upxxuq.png",
    description:
      "V Print Tech is a MERN stack-based printing offset website showcasing printing services, allowing customers to explore and connect easily.",
    demoLink: "https://vprinttech.netlify.app/",
    githubLink: "https://github.com/Sudhakar-sudha",
  },
];

const ProjectsLocalEStartup = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="Projects" className="">
      <div className="px-6 md:px-16 lg:px-32 py-16 relative">
        <h1 className="text-4xl font-bold text-center text-sky-400 mt-8">
          Empower Your Business with LocalEStartup
        </h1>
        <h1 className="text-3xl font-bold text-center text-black mt-4 mb-8">
          Recently Finished Projects
        </h1>

        {/* Slide container */}
        <div className="relative flex justify-center items-center">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-6 bg-white text-white p-2 rounded-full shadow-md hover:bg-sky-500 z-10"
          >
            ◀
          </button>

          {/* Slide */}
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-100 flex justify-center">
              <img
                src={projects[current].image}
                alt={projects[current].title}
                className="w-auto h-56 object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-sky-400">
                {projects[current].title}
              </h2>
              <p className="mt-1 text-sm text-gray-500 italic">
                {projects[current].type}
              </p>
              <p className="mt-4 text-gray-600 text-sm">
                {projects[current].description}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <a
                  href={projects[current].demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
                <a
                  href={projects[current].githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
                >
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-6 bg-white text-white p-2 rounded-full shadow-md hover:bg-sky-500 z-10"
          >
            ▶
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-sky-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsLocalEStartup;
