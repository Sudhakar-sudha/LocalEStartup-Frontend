


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SellerContext } from "./SellerContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const OrderedProducts = () => {
  const [orders, setOrders] = useState([]);
  const { seller } = useContext(SellerContext);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        if (!seller || !seller.id) return;

        console.log("✅ Seller ID found:", seller.id);
        const res = await axios.get(`${BASE_URL}/api/orders/seller/${seller.id}/orders`);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };

    fetchSellerOrders();
  }, [seller]);

  // Show loading or message while waiting for seller
  if (!seller || !seller.id) {
    return (
      <div className="p-6 text-center text-gray-500">Loading seller details...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-black ml-10">Your Product Orders</h1>

      <div className="overflow-x-auto ml-10">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Order Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{order.paymentInfo?.razorpay_order_id?.slice(-6)|| "N/A"} </td>
                <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                <td className="py-3 px-4">
                  {order.products.map((p, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img
                        src={p.product?.images?.[0]}
                        alt={p.product?.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{p.product?.name}</span>
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4">
                  {order.products.map((p, index) => (
                    <div key={index}>{p.quantity}</div>
                  ))}
                </td>
                <td className="py-3 px-4">
                  {order.products.map((p, index) => (
                    <div key={index}>₹{p.price}</div>
                  ))}
                </td>
                <td className="py-3 px-4">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No orders found for you.</p>
        )}
      </div>
    </div>
  );
};

export default OrderedProducts;
