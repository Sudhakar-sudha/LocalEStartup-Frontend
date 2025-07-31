import React, { useEffect, useState } from "react";
import axios from "axios";
import ParticlesBackground from "./ParticlesBackground";

const BASE_URLS = import.meta.env.VITE_BASE_URL;
const BASE_URL = `${BASE_URLS}/api`;

const AdminDashboard = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("freelancers");

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [freelancersRes, trainersRes, feedbackRes] = await Promise.all([
          axios.get(`${BASE_URL}/freelancers`),
          axios.get(`${BASE_URL}/trainers`),
          axios.get(`${BASE_URL}/feedback`),
        ]);

        setFreelancers(freelancersRes.data);
        setTrainers(trainersRes.data);
        setFeedbacks(feedbackRes.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete function
  const handleDelete = async (type, id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${BASE_URL}/${type}/${id}`);
        if (type === "freelancers")
          setFreelancers(freelancers.filter((f) => f._id !== id));
        if (type === "trainers")
          setTrainers(trainers.filter((t) => t._id !== id));
        if (type === "feedback")
          setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="p-6  min-h-screen">
        <ParticlesBackground/>

      <h1 className="text-4xl font-extrabold text-center text-sky-500 mb-10">
        Admin Dashboard
      </h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {["freelancers", "trainers", "feedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-lg font-medium transition ${
              activeTab === tab
                ? "bg-sky-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "freelancers" && "Freelancers"}
            {tab === "trainers" && "Trainers"}
            {tab === "feedback" && "Feedback"}
          </button>
        ))}
      </div>

      {/* Data View */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* FREELANCERS */}
        {activeTab === "freelancers" && (
          <>
            <h2 className="text-2xl font-bold text-sky-600 mb-4">
              Freelancer Joiners ({freelancers.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-left">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Skills</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {freelancers.map((freelancer) => (
                    <tr
                      key={freelancer._id}
                      className="hover:bg-sky-50 border-b"
                    >
                      <td className="p-3">{freelancer.name}</td>
                      <td className="p-3">{freelancer.email}</td>
                      <td className="p-3">{freelancer.phone}</td>
                      <td className="p-3">{freelancer.skills}</td>
                      <td className="p-3">{freelancer.experience}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            handleDelete("freelancers", freelancer._id)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TRAINERS */}
        {activeTab === "trainers" && (
          <>
            <h2 className="text-2xl font-bold text-sky-600 mb-4">
              Trainer Form Data ({trainers.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-left">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Skills</th>
                    <th className="p-3">Education</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map((trainer) => (
                    <tr key={trainer._id} className="hover:bg-sky-50 border-b">
                      <td className="p-3">{trainer.name}</td>
                      <td className="p-3">{trainer.email}</td>
                      <td className="p-3">{trainer.phone}</td>
                      <td className="p-3">{trainer.skills}</td>
                      <td className="p-3">{trainer.education}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            handleDelete("trainers", trainer._id)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* FEEDBACK */}
        {activeTab === "feedback" && (
          <>
            <h2 className="text-2xl font-bold text-sky-600 mb-4">
              Feedback Messages ({feedbacks.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-left">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Message</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((fb) => (
                    <tr key={fb._id} className="hover:bg-sky-50 border-b">
                      <td className="p-3">{fb.name}</td>
                      <td className="p-3">{fb.email}</td>
                      <td className="p-3">{fb.message}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDelete("feedback", fb._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
