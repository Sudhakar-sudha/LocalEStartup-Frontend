import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/admin/payments`);
      setPayments(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await axios.delete(`${BASE_URL}/admin/payments/${id}`);
      setPayments(prev => prev.filter(payment => payment._id !== id));
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("Failed to delete payment.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-black ml-10">All Payments</h1>

      <div className="overflow-x-auto ml-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading payments...</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {payments.map(payment => (
                <tr key={payment._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{payment.razorpay_payment_id || 'N/A'}</td>
                  <td className="py-3 px-4">{payment.razorpay_order_id?.slice(-6) || 'N/A'}</td>
                  <td className="py-3 px-4">₹{payment.amount}</td>
                  <td className="py-3 px-4">{payment.status}</td>
                  <td className="py-3 px-4">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deletePayment(payment._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {payments.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-4">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default Payments;
