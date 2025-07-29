import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StatisticsSectionLocalEStartup = () => {
  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    products: 0,
    orders: 0,
  });

  // Fetch counts from API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userRes, sellerRes, productRes, orderRes] = await Promise.all([
          axios.get(`${BASE_URL}/user/count`),
          axios.get(`${BASE_URL}/sellerdata/sellers/count`),
          axios.get(`${BASE_URL}/product/product/count`),
          axios.get(`${BASE_URL}/api/orders/count`),
        ]);

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

  const statsData = [
    { label: "Users", count: stats.users },
    { label: "Sellers", count: stats.sellers },
    { label: "Products", count: stats.products },
    { label: "Orders Delivered", count: stats.orders },
  ];

  return (
    <section
      className="py-16 text-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('./parralax.jpg')" }}
    >
      <div className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Our Growing Community
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 sm:px-16">
          {statsData.map((stat, index) => (
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
      </div>
    </section>
  );
};

export default StatisticsSectionLocalEStartup;
