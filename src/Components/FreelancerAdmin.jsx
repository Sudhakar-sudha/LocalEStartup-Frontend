import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URLS = import.meta.env.VITE_BASE_URL;

const BASE_URL = `${BASE_URLS}/api`;

const AdminDashboard = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* FREELANCERS */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Freelancer Joiners</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Skills</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((freelancer) => (
              <tr key={freelancer._id} className="border">
                <td className="p-2 border">{freelancer.name}</td>
                <td className="p-2 border">{freelancer.email}</td>
                <td className="p-2 border">{freelancer.phone}</td>
                <td className="p-2 border">{freelancer.skills}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete("freelancers", freelancer._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TRAINERS */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Trainer Form Data</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Skills</th>
              <th className="p-2 border">Education</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="border">
                <td className="p-2 border">{trainer.name}</td>
                <td className="p-2 border">{trainer.email}</td>
                <td className="p-2 border">{trainer.phone}</td>
                <td className="p-2 border">{trainer.skills}</td>
                <td className="p-2 border">{trainer.education}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete("trainers", trainer._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* FEEDBACK */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Feedback Form Data</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb._id} className="border">
                <td className="p-2 border">{fb.name}</td>
                <td className="p-2 border">{fb.email}</td>
                <td className="p-2 border">{fb.message}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete("feedback", fb._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
