import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// const BASE_URL = "http://localhost:3000"; // Define the base URL
const BASE_URL ="https://localestartup-backend.onrender.com";

const RejectedProducts = () => {
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    fetchRejectedProducts();
    fetchCategories();
  }, []);

  const fetchRejectedProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-products`);
      const filteredProducts = response.data.products?.filter(product => product.status === "rejected") || [];
      setRejectedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching rejected products:", error);
      setError("Failed to load rejected products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/categories`);
      const categoryMap = response.data.reduce((acc, category) => {
        acc[category._id] = category.name; // Store categories in { id: name } format
        return acc;
      }, {});
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Rejected Products</h2>

      {loading ? (
        <p className="text-gray-600">Loading rejected products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : rejectedProducts.length === 0 ? (
        <p className="text-gray-500">No rejected products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rejectedProducts.map((product) => (
            <div key={product._id} className="p-4 bg-red-50 border rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-red-800">{product.name}</h4>
              <p className="text-gray-600"><strong>Price:</strong> ₹{product.price}</p>
              <p className="text-gray-600"><strong>Price:</strong> ₹{product.seller.personalInfo.name}</p>
              
              {/* Display Category Name */}
              <p className="text-gray-600">
                <strong>Category:</strong> {categories[product.category] || "Unknown"}
              </p>

              {/* Image Slider */}
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                className="mt-2 rounded-lg border overflow-hidden"
              >
                {product.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Product ${index}`} className="w-full h-40 object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* View More Details */}
              {expandedProduct === product._id ? (
                <div className="mt-2 bg-white p-4 border rounded-lg shadow">
                  <p className="text-gray-700"><strong>Warranty:</strong> {product.warranty} years</p>
                  <p className="text-gray-700"><strong>MRP:</strong> ₹{product.mrp}</p>
                  <p className="text-gray-700"><strong>Discount:</strong> {product.discount}%</p>
                  <p className="text-gray-700"><strong>Description:</strong> {product.description}</p>

                  <button
                    className="mt-2 text-sm text-blue-500 underline"
                    onClick={() => setExpandedProduct(null)}
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 text-sm text-blue-500 underline"
                  onClick={() => setExpandedProduct(product._id)}
                >
                  View More
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedProducts;
