import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URLS = import.meta.env.VITE_BASE_URL;

const TrainingGuidance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const res = await fetch(`${BASE_URLS}/api/trainers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message); // If email already exists
      return;
    }

    setSubmitted(true);
  } catch (err) {
    console.error("Error submitting form", err);
  }
};


  return (
    <section className=" py-16 px-6 md:px-16 lg:px-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-500 mb-6">
        Connect With Us for Training & Guidance
      </h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        We help students upskill in technologies like React, Java, Node.js, 
        MongoDB, Python, and more. Get training, career guidance, placement 
        assistance, and project mentorship from industry experts.
      </p>
  <div className="absolute left-6 top-6">
          <button
            onClick={() => navigate("/")}
            className="bg-sky-200 text-sky-700 px-4 py-2 rounded-lg shadow hover:bg-sky-600 hover:text-white transition"
          >
            ⬅ Back to Website
          </button>
        </div>
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-sky-100 shadow-lg rounded-xl p-8 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <input
              type="text"
              name="skills"
              placeholder="Skills Known (Ex: React, Java)"
              value={formData.skills}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <input
              type="text"
              name="education"
              placeholder="Education/Current Status"
              value={formData.education}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full col-span-2"
            />
            <textarea
              name="message"
              placeholder="Your message or what guidance you need..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-lg p-3 w-full col-span-2"
            ></textarea>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-sky-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-sky-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-green-100 text-green-700 text-center p-6 rounded-lg max-w-lg mx-auto">
          🎉 Thank you for connecting with us! We'll reach out shortly.
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="bg-sky-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-600"
            >
              ⬅ Back to Website
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainingGuidance;
