import { useState, useEffect } from "react";
import axios from "axios";
import PendingProducts from "./PendingProducts";
import ApprovedProducts from "./ApprovedProducts";
import RejectedProducts from "./RejectedProducts";

// const BASE_URL = "http://localhost:3000"; // Define base URL here
const BASE_URL ="https://localestartup-backend.onrender.com";
const AdminProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-products`);
      const allProducts = response.data.products || [];
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      const response = await axios.put(`${BASE_URL}/admin/approve-product/${id}`, { status });
      setMessage(response.data.message);
      fetchProducts(); // Refresh product list after update
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Failed to update product.");
    }
  };

  const pendingProducts = products.filter((product) => product.status === "pending");
  const approvedProducts = products.filter((product) => product.status === "approved");
  const rejectedProducts = products.filter((product) => product.status === "rejected");

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Admin Product Approval
        </h2>

        {message && (
          <p className="text-sm md:text-base text-green-600 mb-3 md:mb-4 text-center">{message}</p>
        )}

        {loading ? (
          <p className="text-gray-600 text-sm md:text-base text-center">Loading products...</p>
        ) : (
          <>
            <PendingProducts products={pendingProducts} onApproval={handleApproval} />
            <ApprovedProducts products={approvedProducts} />
            <RejectedProducts products={rejectedProducts} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProductApproval;
