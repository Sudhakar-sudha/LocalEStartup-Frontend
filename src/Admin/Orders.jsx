// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa'; // ✅ using react-icons for delete icon
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}/admin/orders`);
//       setOrders(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setLoading(false);
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     if (!window.confirm('Are you sure you want to delete this order?')) return;

//     try {
//       await axios.delete(`${BASE_URL}/admin/orders/${orderId}`);
//       setOrders(orders.filter(order => order._id !== orderId)); // update UI
//     } catch (error) {
//       console.error('Error deleting order:', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold mb-6 text-black ml-10">All User Orders</h1>

//       <div className="overflow-x-auto ml-10">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading orders...</p>
//         ) : (
//           <table className="min-w-full bg-white rounded-lg overflow-hidden">
//             <thead className="bg-gray-200 text-gray-700">
//               <tr>
//                 <th className="py-3 px-4">Order ID</th>
//                 <th className="py-3 px-4">User</th>
//                 <th className="py-3 px-4">Products</th>
//                 <th className="py-3 px-4">Amount</th>
//                 <th className="py-3 px-4">Payment</th>
//                 <th className="py-3 px-4">Status</th>
//                 <th className="py-3 px-4">Delivery</th>
//                 <th className="py-3 px-4">Date</th>
//                 <th className="py-3 px-4">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600">
//               {orders.map(order => (
//                 <tr key={order._id} className="border-b hover:bg-gray-100">
//                   <td className="py-3 px-4">{order.paymentInfo?.razorpay_order_id?.slice(-6)}</td>
//                   <td className="py-3 px-4">{order.user?.name || 'N/A'}</td>
//                   <td className="py-3 px-4 space-y-2">
//                     {order.products.map((p, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         {p.product?.image && (
//                           <img
//                             src={p.product.image}
//                             alt={p.product.name}
//                             className="w-10 h-10 object-cover rounded"
//                           />
//                         )}
//                         <span>{p.product?.name} (x{p.quantity})</span>
//                       </div>
//                     ))}
//                   </td>
//                   <td className="py-3 px-4">₹{order.totalAmount}</td>
//                   <td className="py-3 px-4">{order.paymentStatus}</td>
//                   <td className="py-3 px-4">{order.orderStatus}</td>
//                   <td className="py-3 px-4">{order.deliveryBoy?.name || 'Not Assigned'}</td>
//                   <td className="py-3 px-4">{new Date(order.placedAt).toLocaleDateString()}</td>
//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => deleteOrder(order._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {orders.length === 0 && !loading && (
//           <p className="text-center text-gray-500 mt-4">No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;



// components/Orders.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/admin/orders`);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await axios.delete(`${BASE_URL}/admin/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-black ml-10">All User Orders</h1>

      <div className="overflow-x-auto ml-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Delivery</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    {order.paymentInfo?.razorpay_order_id?.slice(-6) || 'N/A'}
                  </td>
                  <td className="py-3 px-4">{order.user?.name || 'N/A'}</td>
                  <td className="py-3 px-4 space-y-2">
  {order.products.map((p, index) => (
    <div key={index} className="flex items-center space-x-2">
      {p.product?.images?.length > 0 && (
        <img
          src={p.product.images[0]} // use the first image in the array
          alt={p.product.name}
          className="w-10 h-10 object-cover rounded"
        />
      )}
      <span>
        {p.product?.name || 'Product Name'} (x{p.quantity})
      </span>
    </div>
  ))}
</td>

                  <td className="py-3 px-4">₹{order.totalAmount}</td>
                  <td className="py-3 px-4">{order.paymentStatus}</td>
                  <td className="py-3 px-4">{order.orderStatus}</td>
                  <td className="py-3 px-4">{order.deliveryBoy?.name || 'Not Assigned'}</td>
                  <td className="py-3 px-4">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {orders.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
