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
    const getMyOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/get-orders-by-user-id",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { data } = res.data;
        setOrders(data);
      } catch (error) {
        console.log(error)
        return handleErrorLogout(error);
      } finally {
        setLoading(false);
      }
    };

    getMyOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-2 flex items-center justify-center gap-3">
            <Package className="h-8 w-8" />
            My Orders
          </h1>
          <p className="text-gray-600">Track your jewellery orders and their status</p>
        </div>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-500 mb-2">
                  No Orders Yet
                </h2>
                <p className="text-gray-400 mb-4">
                  Start shopping to see your order history here
                </p>
                <a 
                  href="/catalogue" 
                  className="inline-block px-6 py-2 bg-[#D4AF37] text-white rounded-full font-semibold shadow-lg hover:bg-[#bfa133] transition"
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
