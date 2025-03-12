


import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductSellers = () => {
  const [sellers, setSellers] = useState([]);

  // Fetch all sellers from the backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sellerdata/sellers`);
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };
    fetchSellers();
  }, []);

  const deleteSeller = async (id) => {
    if (window.confirm("Are you sure you want to delete this seller? This will also delete all their products!")) {
      try {
        await axios.delete(`${BASE_URL}/sellerdata/sellers/${id}`);
        
        // Remove seller from state
        setSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));

        alert("Seller and their products have been deleted successfully.");
      } catch (error) {
        console.error("Error deleting seller and products:", error);
        alert("Failed to delete seller.");
      }
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-semibold text-blue-600 mb-6">Seller Details</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone No</th>
              <th className="border border-gray-300 px-4 py-2">Account No</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-200">
                  <td className="border border-gray-300 px-4 py-2">{seller._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{seller.personalInfo.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{seller.personalInfo.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{seller.personalInfo.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{seller.bankInfo.accountNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{seller.personalInfo.address}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => deleteSeller(seller._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No sellers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSellers;
