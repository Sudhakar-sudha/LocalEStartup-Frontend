


import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
const ApprovalDeliveryboy = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/deliveryboys/`)
      .then(response => {
        console.log("API Response:", response.data); // Debugging
        setDeliveryBoys(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch(error => console.error("Error fetching delivery boys", error));
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/deliveryboys/verify/${id}`);
      toast.success("Delivery Boy Verified!");
      updateStatus(id, "verificationStatus", "Verified");
    } catch (error) {
      toast.error("Error verifying delivery boy");
    }
  };




  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/deliveryboys/approve/${id}`);
      alert(res.data.message || "Delivery Boy Approved!");
      updateStatus(id, "adminApproval", "Approved");
    } catch (error) {
      const msg = error.response?.data?.message || "Error approving delivery boy";
      alert(msg);
    }
  };

  const updateStatus = (id, field, value) => {
    setDeliveryBoys((prev) =>
      prev.map((boy) =>
        boy._id === id ? { ...boy, [field]: value } : boy
      )
    );
  };

  return (
    <div>


      <div className="max-w-xl  p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Approve Delivery Boys</h2>
        <ul className="space-y-4">
          {deliveryBoys.length > 0 ? (
            deliveryBoys.map(boy => (
              <li key={boy._id} className="p-4 border rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{boy.name}</p>
                  <p className="text-gray-600">Phone: {boy.phone}</p>

                </div>
                {boy.verificationStatus === "Pending" && (
                  <>
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleVerify(boy._id)}>Verify</button>
                  </>
                )}
                {/* {boy.verificationStatus === "Verified" && boy.status === "Pending" && (
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleApprove(boy._id)}>Approve</button>
              )} */}
                {boy.verificationStatus === "Verified" &&
                
                  boy.adminApproval !== "Approved" && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleApprove(boy._id)}
                    >
                      Approve
                    </button>
                  )}

              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No delivery boys found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ApprovalDeliveryboy;
