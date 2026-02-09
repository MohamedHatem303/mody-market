"use client";

import { useState } from "react";

type Product = {
  title: string;
  imageCover?: string;
};

type CartItem = {
  _id: string;
  count: number;
  price: number;
  product: Product;
};

type Order = {
  _id: string;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: CartItem[];
};

export default function AllOrder({ orders }: { orders: Order[] }) {
  const [openOrder, setOpenOrder] = useState<Order | null>(null);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Delivered</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-3 font-medium">#{o._id.slice(-6)}</td>

                  <td className="p-3">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">{o.totalOrderPrice} EGP</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        o.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        o.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => setOpenOrder(o)}
                      className="text-primary underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Order #{openOrder._id.slice(-6)}
              </h3>
              <button onClick={() => setOpenOrder(null)}>✕</button>
            </div>

            <div className="space-y-4">
              {openOrder.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product.imageCover ? (
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.count}
                    </p>
                  </div>

                  <div className="font-semibold">{item.price} EGP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
