


import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// const BASE_URL = "http://localhost:3000";
const BASE_URL ="https://localestartup-backend.onrender.com";

const ApprovedProducts = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null); // Track expanded product

  useEffect(() => {
    fetchCategories();
    fetchApprovedProducts();
  }, []);

  // Fetch categories and map them as { categoryId: categoryName }
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/categories`);
      const categoryMap = response.data.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch approved products
  const fetchApprovedProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/all-products`);
      const filteredProducts = response.data.products?.filter(product => product.status === "approved") || [];
      setApprovedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching approved products:", error);
      setError("Failed to load approved products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Approved Products</h2>

      {loading ? (
        <p className="text-gray-600">Loading approved products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : approvedProducts.length === 0 ? (
        <p className="text-gray-500">No approved products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedProducts.map((product) => (
            <div key={product._id} className="p-4 bg-green-50 border rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-green-800">{product.name}</h4>
              <p className="text-gray-600"><strong>Price:</strong> ₹{product.price}</p>
              <p className="text-gray-600">
                <strong>Seller:</strong> {product.seller?.personalInfo?.name || "Unknown Seller"}
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
                  <p className="text-gray-700"><strong>Category:</strong> {categories[product.category] || "Unknown"}</p>
                  <p className="text-gray-700"><strong>Warranty:</strong> {product.warranty} years</p>
                  <p className="text-gray-700"><strong>MRP:</strong> ₹{product.mrp}</p>
                  <p className="text-gray-700"><strong>Discount:</strong> {product.discount}%</p>
                  <p className="text-gray-700"><strong>Description:</strong> {product.description}</p>

                  {/* Additional Information */}
                  {product.additionalInformation && product.additionalInformation.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                      {product.additionalInformation.map((info, index) => (
                        <li key={index}>
                          <strong>{info.title}:</strong> {info.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No additional information available.</p>
                  )}

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

export default ApprovedProducts;
