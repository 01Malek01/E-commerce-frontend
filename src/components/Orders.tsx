import { useEffect, useState } from "react";
import useGetOrders from "../hooks/api/useGetOrders";
import { Order } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { orders: fetchedOrders, isError, isLoading } = useGetOrders();

  useEffect(() => {
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders]);

  // Format date for better readability
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (orders.length === 0) {
    return <div className="text-3xl font-bold mb-8 p-8">No orders yet</div>;
  }
  return (
    <div className="orders p-8">
      <h1 className="text-3xl font-bold mb-8">Your Order History</h1>
      {isLoading && <div className="text-center text-xl">Loading...</div>}
      {isError && (
        <div className="text-center text-xl text-red-500">
          Error loading orders. Please try again later.
        </div>
      )}
      <div className="orders__list space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="orders__item p-6 border border-gray-200 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Order # {order._id.slice(-6).toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Total Price:</span> $
                  {order.totalPrice.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Created At:</span>{" "}
                  {formatDate(order.createdAt)}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Shipping Price:</span> $
                  {order.shippingPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Items</h3>
                <ul className="space-y-2">
                  {order.orderItems.map((item) => (
                    <li key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
