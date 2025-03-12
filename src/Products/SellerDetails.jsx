

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SellerContext } from "./SellerContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SellerDetails = () => {
  const { seller } = useContext(SellerContext); // Get seller from context
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!seller) {
      setError("Seller ID not found in context");
      setLoading(false);
      return;
    }

    const sellerId = seller.id;
    console.log(sellerId);

    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sellerdata/get-seller-by-id/${sellerId}`);
        setSellerDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch seller details");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [seller]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Personal Details */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Seller Details</h2>
      <div className="border-b pb-4">
        <p className="text-lg"><strong>ID:</strong> {sellerDetails._id}</p>
        <p className="text-lg"><strong>Name:</strong> {sellerDetails.personalInfo?.name || "N/A"}</p>
        <p className="text-lg"><strong>Email:</strong> {sellerDetails.personalInfo?.email || "N/A"}</p>
        <p className="text-lg"><strong>Phone:</strong> {sellerDetails.personalInfo?.phone || "N/A"}</p>
        <p className="text-lg"><strong>Address:</strong> {sellerDetails.personalInfo?.address || "N/A"}</p>
        <p className="text-lg"><strong>Verified:</strong> {seller.verified ? "✅ Yes" : "❌ No"}</p>
      </div>

      {/* Business Details */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Business Details</h3>
      <div className="border-b pb-4">
        <p className="text-lg"><strong>Company Name:</strong> {sellerDetails.companyInfo?.companyName || "N/A"}</p>
        <p className="text-lg"><strong>Company Email:</strong> {sellerDetails.companyInfo?.companyEmail || "N/A"}</p>
        <p className="text-lg"><strong>Company Phone:</strong> {sellerDetails.companyInfo?.companyPhone || "N/A"}</p>
        <p className="text-lg"><strong>Company Address:</strong> {sellerDetails.companyInfo?.companyAddress || "N/A"}</p>
        <p className="text-lg"><strong>Owner Name:</strong> {sellerDetails.companyInfo?.ownerName || "N/A"}</p>
      </div>

      {/* Products */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Products</h3>
      <div className="border-b pb-4">
        {sellerDetails.companyInfo.products?.length > 0 ? (
          <ul className="list-disc pl-5">
            {sellerDetails.companyInfo.products.map((product, index) => (
              <li key={index} className="text-lg">{product}</li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No products listed.</p>
        )}
      </div>

      {/* Bank Details */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Bank Details</h3>
      <div>
        <p className="text-lg"><strong>Bank Name:</strong> {sellerDetails.bankInfo?.bankName || "N/A"}</p>
        <p className="text-lg"><strong>Branch Name:</strong> {sellerDetails.bankInfo?.branchName || "N/A"}</p>
        <p className="text-lg"><strong>Account Holder Name:</strong> {sellerDetails.bankInfo?.accountHolderName || "N/A"}</p>
        <p className="text-lg"><strong>Account Number:</strong> {sellerDetails.bankInfo?.accountNumber || "N/A"}</p>
        <p className="text-lg"><strong>Bank Type:</strong> {sellerDetails.bankInfo?.bankType || "N/A"}</p>
        <p className="text-lg"><strong>Bank Address:</strong> {sellerDetails.bankInfo?.bankAddress || "N/A"}</p>
      </div>
    </div>
  );
};

export default SellerDetails;