import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const JoinFreelancerComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
  });

  // Fetch freelancers from backend
  useEffect(() => {
    axios.get(`${BASE_URL}/api/freelancers`)
      .then((res) => setFreelancers(res.data))
      .catch((err) => console.error("Error fetching freelancers", err));
  }, []);
  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/freelancers`, formData);
      setFreelancers((prev) => [res.data, ...prev]); // Add to top
      setFormData({ name: "", email: "", phone: "", skills: "", experience: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting freelancer", err);
      alert("Failed to submit!");
    }
  };

  return (
    <section className="bg-sky-50 py-10">
      {/* Top Image with button */}
      <div className="relative max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600"
          alt="Freelancer work"
          className="w-full h-80 object-cover"
        />
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute inset-0 m-auto h-14 w-52 bg-sky-500 text-white font-semibold text-lg rounded-lg shadow-lg"
        >
          Join as Freelancer
        </motion.button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-sky-600 mb-4">
                Join as Freelancer
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="skills"
                  placeholder="Skills Known (comma separated)"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience / Current Job / Education"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Freelancers List */}
      {freelancers.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h3 className="text-2xl font-bold text-sky-600 mb-6 text-center">
            Freelancers Joined
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((f, index) => (
              <motion.div
                key={f._id || index}
                className="bg-white rounded-lg shadow-lg p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="text-xl font-semibold text-sky-500">{f.name}</h4>
                {/* <p className="text-gray-600">{f.email}</p> */}
                {/* <p className="text-gray-600">{f.phone}</p> */}
                <p className="mt-2 text-gray-700">
                  <strong>Skills:</strong> {f.skills}
                </p>
                {/* {f.experience && (
                  <p className="mt-1 text-gray-700">
                    <strong>Experience:</strong> {f.experience}
                  </p>
                )} */}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default JoinFreelancerComponent;
