


import { useState, useEffect, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SellerContext } from "./SellerContext";
import axios from "axios";


// const BASE_URL = "http://localhost:3000"; // Define the base URL
const BASE_URL ="https://localestartup-backend.onrender.com";

export default function EditProduct() {
  const { seller } = useContext(SellerContext);
  const { register, handleSubmit, watch, reset, setValue,control, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState([]);

  const mrp = watch("mrp", 0);
  const discount = watch("discount", 0);
  // ✅ Initialize useFieldArray for additionalInformation
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInformation",
  });


  useEffect(() => {
    const calculatedPrice = mrp - (mrp * discount) / 100;
    setValue("price", calculatedPrice.toFixed(2));
  }, [mrp, discount, setValue]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    if (seller && seller.id) {
      fetchProducts();
    }
  }, [seller]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/getproduct/${seller.id}`);
      if (response.data.length === 0) {
        // ✅ Show alert only when no products exist
        alert("⚠️ No products found for this seller.");
      }
  
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setImagePreviews(product.images || []);
    setIsEditing(true);
    reset(product);
  };


  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      // Append other fields
      for (const key in data) {
        if (key !== "images" && key !== "additionalInformation") {
          formData.append(key, data[key]);
        }
      }

      // Append new images
      newImages.forEach((image) => formData.append("images", image));

      // ✅ Append Additional Information as JSON string
      if (data.additionalInformation && data.additionalInformation.length > 0) {
        formData.append("additionalInformation", JSON.stringify(data.additionalInformation));
      }
    
    // ✅ Ensure `status` is explicitly set to "Pending"
    formData.append("status", "pending");


      // Send the update request
      const response = await axios.put(
        `${BASE_URL}/product/product/${selectedProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Product updated successfully!");
    setIsEditing(false);

      fetchProducts();

    } catch (error) {
      console.error("Error updating product:", error);

      // Show user-friendly alert messages
      if (error.response) {
        alert(`❌ Error: ${error.response.data.error || "Something went wrong!"}`);
      } else if (error.request) {
        alert("⚠️ Server is not responding. Please try again later.");
      } else {
        alert("❌ An unexpected error occurred. Please check your internet connection.");
      }
    }
  };


const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await axios.delete(`${BASE_URL}/product/product/deleteproduct/${id}`);
    
    alert(response.data.message);
    fetchProducts(); // Refresh the product list after deletion
  } catch (err) {
    console.error("🚨 Error deleting product:", err);
    alert("❌ Failed to delete product. Please try again.");
  }
};


  const handleRemoveImage = (index) => {
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Product Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-3">Name</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border hover:bg-gray-50">
              <td className="border p-3">{product.name}</td>
              <td className="border p-3">₹{product.price}</td>
              <td className="border p-3 flex gap-2">
                <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      
      {isEditing && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsEditing(false)} className="absolute top-2 right-4 text-xl">&times;</button>
            <h2 className="text-2xl font-semibold text-center mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              {["name", "mrp", "discount", "price", "brand", "stock", "description", "warranty"].map((field, index) => (
                <div key={field}>
                  <label className="block font-semibold capitalize">{field}</label>
                  <input {...register(field)} className="w-full p-2 border rounded-md" />
                </div>
              ))}
              {/* Category Dropdown */}
              <div>
                {/* Category */}
                <label className="block font-medium">Category</label>
                <select {...register("category", { required: "Category is required" })} className="w-full p-2 border rounded-md">
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </div>
              {/* Additional Information */}
              <div>
                {/* Additional Information Section */}
                <h3 className="font-medium">Additional Information</h3>
                {fields.map((item, index) => (
                  <div key={item.id} className="flex space-x-2 mb-2">
                    <input
                      {...register(`additionalInformation.${index}.title`, { required: "Title is required" })}
                      placeholder="Title"
                      className="w-1/2 p-2 border rounded-md"
                    />
                    <input
                      {...register(`additionalInformation.${index}.description`, { required: "Description is required" })}
                      placeholder="Description"
                      className="w-1/2 p-2 border rounded-md"
                    />
                    <button type="button" onClick={() => remove(index)} className="text-red-500">X</button>
                  </div>
                ))}
                <button type="button" onClick={() => append({ title: "", description: "" })} className="text-blue-500 mt-2">
                  + Add More
                </button>
              </div>


              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div>
                  <label className="block font-semibold">Existing Images</label>
                  <div className="flex gap-2 flex-wrap">
                    {imagePreviews.map((img, index) => (
                      <div key={img + index} className="relative">
                        <img src={img} alt="Product" className="w-16 h-16 object-cover rounded-md" />
                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Upload */}
              <label className="block font-semibold">Upload Images</label>
              <input type="file" multiple accept="image/*" className="w-full p-2 border rounded-md" onChange={(e) => setNewImages([...e.target.files])} />

              <div className="flex gap-2 mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md w-full">Update</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md w-full">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
