


import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeliveryStatus = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const statusOptions = ["Picked Up", "Going to Delivery", "Delivered", "Completed"];

  useEffect(() => {
    axios.get("http://localhost:3000/api/deliveryboys/")
      .then(response => {
        console.log("API Response:", response.data); // Debugging
        setDeliveryBoys(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch(error => console.error("Error fetching delivery boys", error));
  }, []);

  const updateDeliveryStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/deliveryboys/status/${id}`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      setDeliveryBoys(prev => prev.map(boy => (boy._id === id ? { ...boy, status: newStatus } : boy)));
    } catch (error) {
      toast.error("Error updating delivery status");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Delivery Status Management</h2>
      {deliveryBoys.length > 0 ? (
        <ul className="space-y-4">
          {deliveryBoys.map(boy => (
            <li key={boy._id} className="p-4 border rounded flex justify-between items-center">
              <p className="font-semibold">{boy.name} - {boy.status}</p>
              <select className="p-2 border rounded" onChange={(e) => updateDeliveryStatus(boy._id, e.target.value)} value={boy.status}>
                {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No delivery boys found.</p>
      )}
    </div>
  );
};

export default DeliveryStatus;
