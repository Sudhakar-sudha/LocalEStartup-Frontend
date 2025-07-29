import React from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaBuilding,
  FaRocket,
  FaUserGraduate,
} from "react-icons/fa";

const TrainingGuidanceLayout = () => {
  const skills = [
    "Java",
    "HTML",
    "JavaScript",
    "React",
    "React Native",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "Flask",
    "Python",
    "Next.js",
    "PHP",
  ];

  const companies = ["Zoho", "HCL", "Dellotie", "Small-Sized Companies"];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 70 },
    }),
  };

  return (
    <section className="bg-gradient-to-br from-sky-400 via-white to-sky-400 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaChalkboardTeacher className="text-5xl text-sky-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-sky-600">
            Training & Guidance for College Students
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Helping students gain real-world skills, corporate exposure, and
            career guidance for a successful future.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          {/* Left: Corporate Training */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold text-sky-500 flex items-center gap-2 mb-6">
              <FaBuilding /> Placement Guidance For:
            </h3>
            <div className="flex flex-wrap gap-4">
              {companies.map((company, index) => (
                <motion.div
                  key={index}
                  className="bg-sky-100 text-sky-700 px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-sky-200 transition cursor-pointer"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skills Training */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
              <FaLaptopCode /> Hands-on Training in:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-sky-100 text-sky-700 px-4 py-2 rounded-lg text-center font-semibold shadow hover:bg-sky-200 transition cursor-pointer"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Career & Higher Studies */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-bold text-sky-500 flex items-center gap-2">
            <FaRocket /> Career & Higher Studies Guidance:
          </h3>
          <p className="mt-4 text-gray-700 leading-relaxed text-lg">
            We provide complete guidance for <strong>interview preparation</strong>,{" "}
            <strong>placements</strong>, and <strong>higher studies</strong>. Our
            sessions include mock interviews, aptitude training, resume building,
            and counseling to help students choose the right career path or
            higher education opportunities.
          </p>

          {/* Call to Action */}
          <div className="flex justify-center mt-8">
            <motion.a
              href=""
              className="flex items-center gap-2 bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserGraduate /> Connect Now for Training & Guidance
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingGuidanceLayout;
