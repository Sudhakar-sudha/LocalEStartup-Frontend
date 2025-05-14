



// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import ApprovedDeliveryBoys from "./ApprovedDeliveryBoys";

// const DeliveryBoyRegistration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     dob: "",
//     address: "",
//     vehicleType: "",
//     vehicleNumber: "",
//     licenseNumber: "",
//     upiId: "",
//     accountNumber: "",
//     aadharNumber: "",
//     selfie: null,
//     aadharPhoto: null, // Added Aadhar photo field
//   });

//   const [errors, setErrors] = useState({});
//   const [generalError, setGeneralError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setGeneralError("");
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number required";
//     if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email required";
//     if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required";
//     if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle number is required";
//     if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
//     if (!formData.upiId.trim()) newErrors.upiId = "UPI ID is required";
//     if (!formData.accountNumber.trim() || !/^\d{9,18}$/.test(formData.accountNumber)) newErrors.accountNumber = "Valid account number required";
//     if (!formData.aadharNumber.trim() || !/^\d{12}$/.test(formData.aadharNumber)) newErrors.aadharNumber = "Valid 12-digit Aadhar number required";
//     if (!formData.selfie) newErrors.selfie = "Selfie is required";
//     if (!formData.aadharPhoto) newErrors.aadharPhoto = "Aadhar photo is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     try {
//       const response = await axios.post("http://localhost:3000/api/deliveryboys/add", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(response.data.message || "Registration successful! Pending admin verification.");
//       navigate("/otp-verify", { state: { email: formData.email } });

//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         dob: "",
//         address: "",
//         vehicleType: "",
//         vehicleNumber: "",
//         licenseNumber: "",
//         upiId: "",
//         accountNumber: "",
//         aadharNumber: "",
//         selfie: null,
//         aadharPhoto: null,
//       });

//       setErrors({});
//       setGeneralError("");
//     }
//     catch (error) {
//       console.error("Registration Error:", error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || "Error registering. Please try again.";
//       alert(errorMessage);
//     }
    
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Delivery Boy Registration</h2>

//       {generalError && <p className="text-red-500 text-sm mb-2">{generalError}</p>}

//       <form onSubmit={handleSubmit} className="space-y-3">
//         {Object.keys(formData).map((key) =>
//           key !== "selfie" && key !== "aadharPhoto" ? (
//             <div key={key}>
//               <input
//                 type={key === "dob" ? "date" : "text"}
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 placeholder={key.replace(/([A-Z])/g, " $1").trim()}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
//             </div>
//           ) : null
//         )}

//         {/* File Upload for Selfie */}
//         <div>
//           <input type="file" name="selfie" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
//           {errors.selfie && <p className="text-red-500 text-sm">{errors.selfie}</p>}
//         </div>

//         {/* File Upload for Aadhar Photo */}
//         <div>
//           <input type="file" name="aadharPhoto" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
//           {errors.aadharPhoto && <p className="text-red-500 text-sm">{errors.aadharPhoto}</p>}
//         </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
//           Register
//         </button>
//       </form>
//       <ApprovedDeliveryBoys />
//     </div>
//   );
// };

// export default DeliveryBoyRegistration;



import React from 'react'
import AllDeliveryBoys from './AllDeliveryBoys';
import ApprovalDeliveryboy from './ApprovalDeliveryboy';
import ApprovedDeliveryBoys from './ApprovedDeliveryBoys'
const Deliveryboy = () => {
  return (
    <div>
      <div>
      <AllDeliveryBoys/>
      </div>
    
      <ApprovalDeliveryboy/>
      {/* <ApprovedDeliveryBoys/> */}
    </div>
  )
}

export default Deliveryboy