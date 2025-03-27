


import { useState, useEffect, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SellerContext } from "./SellerContext";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductForm() {
  const { seller } = useContext(SellerContext);
  const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/product/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const productName = watch("name", "");
  const mrp = watch("mrp", 0);
  const discount = watch("discount", 0);

  useEffect(() => {
    const calculatedPrice = mrp - (mrp * discount) / 100;
    setValue("price", calculatedPrice.toFixed(2));
  }, [mrp, discount, setValue]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }
  
    for (let file of files) {
      if (file.size > 1048576) { // 1MB size limit
        alert(`Image ${file.name} exceeds 1MB limit.`);
        return;
      }
    }
  
    setValue("images", files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const { fields, append, remove } = useFieldArray({ control, name: "additionalInformation" });

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when form submission starts
  
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images.forEach((image) => formData.append("images", image));
      } else if (key === "additionalInformation") {
        formData.append(key, JSON.stringify(data[key])); 
      } else {
        formData.append(key, data[key]);
      }
    });
  
    formData.append("seller", seller.id);
  
    try {
      await axios.post(`${BASE_URL}/product/product/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
      reset();
      setImagePreviews([]);
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(`❌ Error: ${error.response.data.error}`);
      } else {
        alert("❌ An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading to false after API call completes
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Product Name */}
        <label className="block font-medium">Product Name</label>
        <input {...register("name", { required: "Product name is required" })} className="w-full p-2 border rounded-md" />

        {/* Description */}
        <label className="block font-medium">Description</label>
        <textarea {...register("description", { required: "Description is required" })} className="w-full p-2 border rounded-md"></textarea>

        {/* Category */}
        <label className="block font-medium">Category</label>
        <select {...register("category", { required: "Category is required" })} className="w-full p-2 border rounded-md">
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>

        {/* MRP */}
        <label className="block font-medium">MRP (₹)</label>
        <input {...register("mrp", { required: "MRP is required", valueAsNumber: true })} type="number" className="w-full p-2 border rounded-md" />

        {/* Discount */}
        <label className="block font-medium">Discount (%)</label>
        <input {...register("discount", { valueAsNumber: true })} type="number" className="w-full p-2 border rounded-md" />

        {/* Auto-calculated Price */}
        <label className="block font-medium">Final Price (₹)</label>
        <input {...register("price")} type="number" className="w-full p-2 border rounded-md bg-gray-100" readOnly />

        {/* Brand */}
        <label className="block font-medium">Brand</label>
        <input {...register("brand", { required: "Brand is required" })} className="w-full p-2 border rounded-md" />

        {/* Stock */}
        <label className="block font-medium">Stock</label>
        <input {...register("stock", { required: "Stock is required", valueAsNumber: true })} type="number" className="w-full p-2 border rounded-md" />

        {/* Tags */}
        <label className="block font-medium">Tags (comma separated)</label>
        <input {...register("tags")} className="w-full p-2 border rounded-md" />

        {/* Return Policy */}
        <label className="block font-medium">Return Policy</label>
        <input {...register("returnPolicy")} className="w-full p-2 border rounded-md" />

        {/* Warranty */}
        <label className="block font-medium">Warranty</label>
        <input {...register("warranty")} className="w-full p-2 border rounded-md" />

        {/* Additional Information */}
        <h3 className="font-medium">Additional Information</h3>
        {fields.map((item, index) => (
          <div key={item.id} className="flex space-x-2 mb-2">
            <input {...register(`additionalInformation.${index}.title`)} placeholder="Title" className="w-1/2 p-2 border rounded-md" />
            <input {...register(`additionalInformation.${index}.description`)} placeholder="Description" className="w-1/2 p-2 border rounded-md" />
            <button type="button" onClick={() => remove(index)} className="text-red-500">X</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ title: "", description: "" })} className="text-blue-500 mt-2">+ Add More</button>

        {/* Image Upload */}
        <label className="block font-medium">Upload Images</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded-md" />
        <div className="mt-2 flex flex-wrap gap-2">{imagePreviews.map((src, index) => (<img key={index} src={src} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />))}</div>

        {/* Submit Button */}
        {/* <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Product</button> */}
        <button 
  type="submit" 
  className={`w-full text-white p-2 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} 
  disabled={loading}
>
  {loading ? "Adding Product..." : "Add Product"}
</button>

      </form>
    </div>
  );
}
