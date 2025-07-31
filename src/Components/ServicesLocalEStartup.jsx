"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const serviceData = [
  {
    title: "Web Development",
    description:
      "We build responsive and modern websites using React, TailwindCSS, and Next.js to ensure fast performance and scalability.",
    image: "./webdevelopment.png",
    link: "contact",
  },
  {
    title: "Mobile App Development",
    description:
      "We create high-performance Android & iOS apps using React Native and Expo for seamless user experiences.",
    image: "./appdevelopment.jpeg",
    link: "contact",
  },
  {
    title: "UI/UX Design",
    description:
      "We craft intuitive and attractive UI/UX designs to enhance user interaction and engagement across your digital platforms.",
    image: "./ecommerce.jpeg",
    link: "contact",
  },
];

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      type: "spring",
    },
  }),
};

const Services = () => {
  return (
    <div className="py-10 px-5">
      <div className="text-5xl text-sky-500 font-bold text-center mt-14">
        Our Services
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-start">
        {serviceData.map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col justify-between">
                <div>
                  <CardItem
                    translateZ={50}
                    className="text-xl font-bold text-sky-600 "
                  >
                    {service.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ={60}
                    className="text-neutral-500 text-sm max-w-sm mt-2 "
                  >
                    {service.description}
                  </CardItem>
                  <CardItem translateZ={100} className="w-full mt-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>
                </div>

                <div className="flex justify-center mt-6">
                  <CardItem
                    translateZ={20}
                    as="button"
                    onClick={() => {
                      const target = document.getElementById(service.link); // service.link now holds the ID
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="px-6 py-2 rounded-xl bg-sky-600 text-white text-sm font-semibold transition-transform hover:scale-105"
                  >
                    Try now
                  </CardItem>

                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
