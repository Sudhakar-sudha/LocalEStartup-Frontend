


import { useState, useEffect ,useContext } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SellerContext } from "./SellerContext";

// const BASE_URL = "http://localhost:3000";
const BASE_URL ="https://localestartup-backend.onrender.com";

const ListProducts = () => {
  const { seller } = useContext(SellerContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!seller || !seller.id) {
          return;
        }

        console.log("✅ Seller ID found:", seller.id);

        const response = await axios.get(`${BASE_URL}/product/getproduct/${seller.id}`);
        if (response.data.length === 0) {
          alert("⚠️ No products found for this seller.");
        }
        setProducts(response.data);
        
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [seller]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // 🔄 Filtering products based on status
  const pendingProducts = products.filter(product => product.status === "pending");
  const approvedProducts = products.filter(product => product.status === "approved");
  const rejectedProducts = products.filter(product => product.status === "rejected");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">All Products</h2>

      {/* ✅ Approved Products */}
      <h3 className="text-2xl font-semibold text-green-600 my-4">Approved Products</h3>
      <ProductList products={approvedProducts} message="No approved products." bgColor="bg-green-200" />

      {/* 🟡 Pending Approval Products */}
      <h3 className="text-2xl font-semibold text-yellow-600 my-4">Pending Approval</h3>
      <ProductList products={pendingProducts} message="No pending products." bgColor="bg-orange-200" />

      {/* ❌ Rejected Products */}
      <h3 className="text-2xl font-semibold text-red-600 my-4">Rejected Products</h3>
      <ProductList products={rejectedProducts} message="No rejected products." bgColor="bg-red-200" />
    </div>
  );
};

// 🛒 Reusable Product List Component
const ProductList = ({ products, message, bgColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className={`border p-5 rounded-xl shadow-lg ${bgColor}`}>
            <div className="relative w-full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="rounded-md"
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center items-center w-full h-[250px]">
                        <img
                          src={image}
                          alt={`${product.name} - ${index + 1}`}
                          className="max-w-full max-h-full object-contain rounded-md"
                        />
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="flex justify-center items-center w-full h-[250px]">
                      <img
                        src="https://via.placeholder.com/200"
                        alt="Placeholder"
                        className="max-w-full max-h-full object-contain rounded-md"
                      />
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>

            {/* Product Details */}
            <h3 className="text-xl font-bold mt-3">{product.name}</h3>
            <h3 className="text-xl mt-3">{product.description}</h3>

            {product.discount > 0 && (
              <p className="text-lg font-semibold text-gray-500 line-through">₹{product.mrp}</p>
            )}
            <p className="text-lg font-bold text-green-600">₹{product.price}</p>
            {product.discount > 0 && (
              <p className="text-sm text-red-500">({product.discount}% OFF)</p>
            )}

            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500">Sold: {product.soldCount}</p>

            <p className="text-sm text-gray-500 flex items-center">
              Ratings: {" "}
              {[...Array(5)].map((_, i) => (
                <span key={i} className="ml-1">
                  {i < product.ratings ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                </span>
              ))}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center col-span-3">{message}</p>
      )}
    </div>
  );
};

export default ListProducts;
