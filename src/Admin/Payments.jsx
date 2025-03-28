


// import axios from "axios";
// import { toast } from "react-toastify";
// import { useState, useEffect } from "react";
// import AllDeliveryBoys from "./AllDeliveryBoys";
// const AdminDashboard = () => {
//   const [deliveryBoys, setDeliveryBoys] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/deliveryboys/")
//       .then(response => {
//         console.log("API Response:", response.data); // Debugging
//         setDeliveryBoys(Array.isArray(response.data.data) ? response.data.data : []);
//       })
//       .catch(error => console.error("Error fetching delivery boys", error));
//   }, []);

//   const handleVerify = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/deliveryboys/verify/${id}`);
//       toast.success("Delivery Boy Verified!");
//       updateStatus(id, "verificationStatus", "Verified");
//     } catch (error) {
//       toast.error("Error verifying delivery boy");
//     }
//   };



//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/deliveryboys/approve/${id}`);
//       toast.success("Delivery Boy Approved!");
//       updateStatus(id, "status", "Approved");
//     } catch (error) {
//       toast.error("Error approving delivery boy");
//     }
//   };

//   const updateStatus = (id, field, value) => {
//     setDeliveryBoys(prev =>
//       prev.map(boy => (boy._id === id ? { ...boy, [field]: value } : boy))
//     );
//   };

//   return (
//     <div>


//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Approve Delivery Boys</h2>
//       <ul className="space-y-4">
//         {deliveryBoys.length > 0 ? (
//           deliveryBoys.map(boy => (
//             <li key={boy._id} className="p-4 border rounded flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">{boy.name}</p>
//                 <p className="text-gray-600">Phone: {boy.phone}</p>
//                 <p className={`text-sm ${boy.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
//                   Status: {boy.status}
//                 </p>
//               </div>
//               {boy.verificationStatus === "Pending" && (
//                 <>
//                   <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleVerify(boy._id)}>Verify</button>
//                 </>
//               )}
//               {boy.verificationStatus === "Verified" && boy.status === "Pending" && (
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleApprove(boy._id)}>Approve</button>
//               )}
//             </li>
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No delivery boys found.</p>
//         )}
//       </ul>
//     </div>
//     <AllDeliveryBoys/>

//     </div>
//   );
// };

// export default AdminDashboard;



import React from 'react'

const Payments = () => {
  return (
    <div>Payments</div>
  )
}

export default Payments