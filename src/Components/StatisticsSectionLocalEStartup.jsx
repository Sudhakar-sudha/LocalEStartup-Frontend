import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StatisticsSectionLocalEStartup = () => {
  const [stats, setStats] = useState({
    Product: '1',
    liveProjects: '1',
    clgProjects: '3+',
    availability: '27/7',
  });

  const statsData = [
    { label: "Product", count: stats.Product },
    { label: "Live Projects", count: stats.liveProjects },
    { label: "Clg Projects", count: stats.clgProjects },
    { label: "Availability", count: stats.availability },
  ];

  return (
    <section
      className="py-16 text-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('./parralax.jpg')" }}
    >
      <div className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Our Growing Achievements
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 sm:px-16">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold">
                {stat.count.toLocaleString()}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSectionLocalEStartup;
