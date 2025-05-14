

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const AdminDashboard = () => {
//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDeliveryBoys();
//   }, []);

//   const fetchDeliveryBoys = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/deliveryboys`);
//       if (response.data && Array.isArray(response.data.data)) {
//         setDeliveryBoys(response.data.data);
//       } else {
//         setDeliveryBoys([]);
//       }
//     } catch (error) {
//       setError("Failed to fetch data. Please try again.");
//       setDeliveryBoys([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this delivery boy?")) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/deliveryboys/${id}`);
//     alert("Delivery boy deleted successfully!");
//       setDeliveryBoys(deliveryBoys.filter((boy) => boy._id !== id));
//     } catch (error) {
//       toast.error("Error deleting delivery boy. Please try again.");
//       console.error("Delete Error:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Delivery Boys</h1>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && !error && (
//         <table className="w-full border-collapse border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">DOB</th>
//               <th className="border p-2">Address</th>
//               <th className="border p-2">Vehicle</th>
//               <th className="border p-2">License</th>
//               <th className="border p-2">UPI ID</th>
//               <th className="border p-2">Account No</th>
//               <th className="border p-2">Selfie</th>
//               <th className="border p-2">AadharPhoto</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Admin Approval</th>
//               <th className="border p-2">Admin Approval</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {deliveryBoys.length > 0 ? (
//               deliveryBoys.map((boy) => (
//                 <tr key={boy._id} className="text-center">
//                   <td className="border p-2">{boy.name || "N/A"}</td>
//                   <td className="border p-2">{boy.email || "N/A"}</td>
//                   <td className="border p-2">{boy.phone || "N/A"}</td>
//                   <td className="border p-2">{boy.dob || "N/A"}</td>
//                   <td className="border p-2">{boy.address || "N/A"}</td>
//                   <td className="border p-2">{boy.vehicleType} - {boy.vehicleNumber}</td>
//                   <td className="border p-2">{boy.licenseNumber || "N/A"}</td>
//                   <td className="border p-2">{boy.upiId || "N/A"}</td>
//                   <td className="border p-2">{boy.accountNumber || "N/A"}</td>
//                   <td className="border p-2">
//                     <img src={boy.selfie[0]} alt="Selfie" className="w-16 h-16 object-cover mx-auto" />
//                   </td>
//                   <td className="border p-2">
//                     <img src={boy.aadharPhoto[0]} alt="aadharPhoto" className="w-16 h-16 object-cover mx-auto" />
//                     AadharNo: {boy.aadharNumber || "N/A"}
//                   </td>
//                   <td className="border p-2">{boy.status || "Pending"}</td>
//                   <td className={`border p-2 ${boy.adminApproval === "Approved" ? "text-green-600" : "text-red-600"}`}>
//                     {boy.adminApproval || "Pending"}
//                   </td>
//                   <td className="border p-2">{boy.verificationStatus || "N/A"}</td>

//                   <td className="border p-2">
//                     <button
//                       onClick={() => handleDelete(boy._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="14" className="border p-2 text-center text-gray-500">
//                   No Delivery Boys Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;




import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/deliveryboys`);
      if (response.data && Array.isArray(response.data.data)) {
        setDeliveryBoys(response.data.data);
      } else {
        setDeliveryBoys([]);
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      setDeliveryBoys([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this delivery boy?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/deliveryboys/${id}`);
      alert("Delivery boy deleted successfully!");
      setDeliveryBoys(deliveryBoys.filter((boy) => boy._id !== id));
    } catch (error) {
      toast.error("Error deleting delivery boy. Please try again.");
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4  text-black">Delivery Boys</h1>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <div className=" overflow-hidden">
          <div className="overflow-auto max-h-[500px] max-w-[1170px]">
            <table className="min-w-full border-collapse text-sm bg-white">
              <thead className="bg-orange-500 text-white sticky top-0">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "DOB",
                    "Address",
                    "Vehicle Type",
                    "Vehicle Number",
                    "License",
                    "UPI ID",
                    "Account No",
                    "Selfie",
                    "Aadhar Photo",
                   
                    "Admin Approval",
                    "Verification Status",
                    "Actions",
                  ].map((header, index) => (
                    <th key={index} className="border p-3 text-left whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliveryBoys.length > 0 ? (
                  deliveryBoys.map((boy) => (
                    <tr key={boy._id} className="text-center hover:bg-gray-100 transition">
                      <td className="border p-2">{boy.name || "N/A"}</td>
                      <td className="border p-2">{boy.email || "N/A"}</td>
                      <td className="border p-2">{boy.phone || "N/A"}</td>
                      <td className="border p-2 whitespace-nowrap">{boy.dob || "N/A"}</td>
                      <td className="border p-2 max-w-[200px] truncate">{boy.address || "N/A"}</td>
                      <td className="border p-2">{boy.vehicleType || "N/A"}</td>
                      <td className="border p-2">{boy.vehicleNumber || "N/A"}</td>
                      <td className="border p-2">{boy.licenseNumber || "N/A"}</td>
                      <td className="border p-2">{boy.upiId || "N/A"}</td>
                      <td className="border p-2">{boy.accountNumber || "N/A"}</td>
                      <td className="border p-2">
                        <img
                          src={boy.selfie?.[0]}
                          alt="Selfie"
                          className="w-14 h-14 rounded-full object-cover mx-auto border border-gray-300 shadow-sm"
                        />
                      </td>
                      <td className="border p-2">
                        <img
                          src={boy.aadharPhoto?.[0]}
                          alt="Aadhar"
                          className="w-14 h-14 object-cover mx-auto border border-gray-300 shadow-sm"
                        />
                        <p className="text-xs text-gray-600 mt-1">Aadhar: {boy.aadharNumber || "N/A"}</p>
                      </td>
                 
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            boy.adminApproval === "Approved"
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {boy.adminApproval || "Pending"}
                        </span>
                      </td>
                      <td className="border p-2">{boy.verificationStatus || "N/A"}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleDelete(boy._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="16" className="border p-4 text-center text-gray-500">
                      No Delivery Boys Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
