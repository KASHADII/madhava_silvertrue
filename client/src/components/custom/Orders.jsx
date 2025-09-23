import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import OrderProductTile from "./OrderProductTile";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Truck, Package, ExternalLink, MapPin } from "lucide-react";
import useErrorLogout from "@/hooks/use-error-logout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { handleErrorLogout } = useErrorLogout();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = () => {
      try {
        axios
          .get(
            import.meta.env.VITE_API_URL +
              `/get-all-orders?page=${currentPage}&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            const { data, totalPages, currentPage } = res.data;
            setOrders(data);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          });
      } catch (error) {
        return handleErrorLogout(error, error.response.data.message);
      }
    };
    fetchOrders();
  }, [currentPage]);

  const updateOrderStatus = async (status, paymentId) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/update-order-status/${paymentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      return handleErrorLogout(error, error.response.data.message);
    }
  };

  const updateShippingStatus = async (orderId, shippingStatus) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/shipping/admin/order/${orderId}/status`,
        { shippingStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (res.data.success) {
        toast({
          title: "Success",
          description: "Shipping status updated successfully",
        });
        // Refresh orders
        fetchOrders();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update shipping status",
        variant: "destructive",
      });
    }
  };

  const generateAWB = async (orderId) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + `/shipping/admin/order/${orderId}/awb`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (res.data.success) {
        toast({
          title: "Success",
          description: "AWB generated successfully",
        });
        // Refresh orders
        fetchOrders();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to generate AWB",
        variant: "destructive",
      });
    }
  };

  const getShippingStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "picked_up":
        return "bg-blue-100 text-blue-800";
      case "in_transit":
        return "bg-purple-100 text-purple-800";
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-2 ml-3">Orders</h1>
      <div className="flex flex-col gap-5 mx-auto ">
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <div className="grid space-y-1 gap-2 sm:w-[80vw]">
              {orders.length === 0 ? (
                <h2 className="text-primary text-3xl">
                  Nothing To Show, Please add some products...
                </h2>
              ) : (
                orders.map((item) => (
                  <Card key={item._id} className="space-y-2 p-3 shadow-md">
                    <div className="grid sm:grid-cols-3 gap-2">
                      {item?.products?.map((product) => (
                        <OrderProductTile key={product._id} {...product} />
                      ))}
                    </div>
                    <hr />
                    <div>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Total:</span>
                        <span className="text-sm text-customGray">
                          ₹{item?.amount}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Address:</span>
                        <span className="text-sm text-customGray">
                          {item?.address}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Name:</span>
                        <span className="text-sm text-customGray">
                          {item?.userId?.name}
                        </span>
                      </p>
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Email:</span>
                        <span className="text-sm text-customGray">
                          {item?.userId?.email}
                        </span>
                      </p>

                      {/* Shipping Information */}
                      {item.shipping && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Shipping Information
                          </h4>
                          
                          <div className="space-y-2 text-sm">
                            {item.shipping.shippingStatus && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Status:</span>
                                <Badge className={getShippingStatusColor(item.shipping.shippingStatus)}>
                                  {item.shipping.shippingStatus.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </div>
                            )}
                            
                            {item.shipping.awbCode && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">AWB:</span>
                                <span className="font-mono bg-white px-2 py-1 rounded border">
                                  {item.shipping.awbCode}
                                </span>
                                {item.shipping.trackingUrl && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(item.shipping.trackingUrl, '_blank')}
                                    className="h-6 px-2"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            )}
                            
                            {item.shipping.courierName && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Courier:</span>
                                <span>{item.shipping.courierName}</span>
                              </div>
                            )}

                            {item.shipping.shippingAddress && (
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <div>
                                  <div className="font-medium">{item.shipping.shippingAddress.name}</div>
                                  <div>{item.shipping.shippingAddress.address}</div>
                                  <div>{item.shipping.shippingAddress.city}, {item.shipping.shippingAddress.state} - {item.shipping.shippingAddress.pincode}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Admin Controls */}
                          <div className="mt-3 flex gap-2">
                            {!item.shipping.awbCode && item.shipping.shipmentId && (
                              <Button
                                size="sm"
                                onClick={() => generateAWB(item._id)}
                                className="flex items-center gap-1"
                              >
                                <Package className="h-3 w-3" />
                                Generate AWB
                              </Button>
                            )}
                            
                            <Select
                              value={item.shipping.shippingStatus || "pending"}
                              onValueChange={(value) => updateShippingStatus(item._id, value)}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Shipping Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="picked_up">Picked Up</SelectItem>
                                <SelectItem value="in_transit">In Transit</SelectItem>
                                <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <p className="flex justify-between sm:justify-start gap-2 items-center px-3">
                        <span className="font-bold">Payment Id:</span>
                        <span className="text-sm text-customGray">
                          {item?.razorpayPaymentId}
                        </span>
                      </p>
                    </div>
                    <Select
                      onValueChange={(value) => {
                        alert("Do you really want to update the status?");
                        updateOrderStatus(value, item.razorpayPaymentId);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="pending" />
                      </SelectTrigger>
                      <SelectContent className="capitalize">
                        <SelectItem value="pending">pending</SelectItem>
                        <SelectItem value="packed">packed</SelectItem>
                        <SelectItem value="in transit">in transit</SelectItem>
                        <SelectItem value="completed">completed</SelectItem>
                        <SelectItem value="failed">failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  setCurrentPage((currentPage) =>
                    currentPage >= 2 ? currentPage - 1 : 1
                  );
                }}
              />
            </PaginationItem>
            <PaginationItem>
              {Array.from({ length: totalPages }, (data, i) => (
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(i + 1)}
                  key={i}
                >
                  {i + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Orders;
