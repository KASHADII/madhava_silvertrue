import OrderData from "@/components/custom/OrderData";
import useErrorLogout from "@/hooks/use-error-logout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag } from "lucide-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleErrorLogout } = useErrorLogout();

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/orders/get-orders-by-user-id",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = await res.data;
        setOrders(data);
      } catch (error) {
        console.log(error)
        return handleErrorLogout(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-8 w-8 text-black" />
            <h1 className="text-4xl font-light text-black">My Orders</h1>
            <Package className="h-8 w-8 text-black" />
          </div>
          <p className="text-gray-600 font-light">Track your jewellery orders and their status</p>
        </div>

        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-black font-light">
              <ShoppingBag className="h-5 w-5 text-black" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-light text-gray-500 mb-2">
                  No Orders Yet
                </h2>
                <p className="text-gray-400 font-light mb-6">
                  Start shopping to see your order history here
                </p>
                <a 
                  href="/catalogue" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                >
                  Browse Products
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderData key={order._id} {...order} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyOrders;
