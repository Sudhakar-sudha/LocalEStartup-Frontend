import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";
import image from "/TeamLogo1.png";
import ParticlesBackground from "./ParticlesBackground";
import ServicesLocalEStartup from "./ServicesLocalEStartup";
import AboutLocalEStartup from "./AboutLocalEStartup";
import FooterLocalEStartup from "./FooterLocalEStartup";
import ProjectsLocalEStartup from "./ProjectsLocalEStartup";
import Navbar from "./NavbarLocalEStartup";
import StatisticsSectionLocalEStartup from "./StatisticsSectionLocalEStartup";

const LocalEStartup = () => {
 
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      <Navbar handleScroll={handleScroll} />

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

      <section id="about">
        <AboutLocalEStartup />
      </section>


      <section id="services">
        <ServicesLocalEStartup />
      </section>

      <StatisticsSectionLocalEStartup/>

      <section id="Projects" className="bg-sky-50">
        <ProjectsLocalEStartup />
      </section>


      <section id="contact">
        <FooterLocalEStartup />
      </section>


      {/* Footer */}
      <footer id="contact" className="py-4 text-center bg-gray-800 text-white">
        <p>&copy; 2025 LocalEStartup. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LocalEStartup;
