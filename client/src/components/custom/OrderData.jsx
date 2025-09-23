import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowDownToLine, IndianRupee, Truck, Package, ExternalLink, MapPin } from "lucide-react";
import { PDFDocument,rgb } from "pdf-lib";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const OrderData = ({
  amount = 100,
  address = "123, abc street, xyz city",
  status = "pending",
  createdAt = "2021-09-01",
  updatedAt = "2021-09-01",
  products,
  shipping = {},
  _id: orderId,
}) => {
  const [trackingData, setTrackingData] = useState(null);
  const [loadingTracking, setLoadingTracking] = useState(false);
  const { toast } = useToast();

  const handleTrackShipment = async () => {
    if (!shipping.awbCode) {
      toast({
        title: "No tracking available",
        description: "AWB code not found for this order",
        variant: "destructive",
      });
      return;
    }

    setLoadingTracking(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shipping/track/${shipping.awbCode}`
      );
      
      if (response.data.success) {
        setTrackingData(response.data.data);
        toast({
          title: "Tracking data loaded",
          description: "Shipment tracking information retrieved",
        });
      } else {
        toast({
          title: "Tracking failed",
          description: response.data.message || "Failed to get tracking data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tracking data",
        variant: "destructive",
      });
    } finally {
      setLoadingTracking(false);
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

  const handleDownloadInvoice = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);

      // Add header
      page.drawRectangle({
        x: 0,
        y: 720,
        width: 600,
        height: 80,
        color: rgb(0, 0.53, 0.71),
      });
      page.drawText("INVOICE", {
        x: 50,
        y: 750,
        size: 28,
        color: rgb(1, 1, 1),
      });
      page.drawText("CodeStore", {
        x: 400,
        y: 750,
        size: 12,
        color: rgb(1, 1, 1),
      });
      page.drawText("Mumbai, Maharashtra", { x: 400, y: 735, size: 10 });
      page.drawText("Email: support@company.com", { x: 400, y: 705, size: 10 });
      page.drawText("Phone: +1 234 567 890", { x: 400, y: 690, size: 10 });

      // Add order details
      page.drawText("Order Details", {
        x: 50,
        y: 670,
        size: 16,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Paid: Rs.${amount}`, { x: 50, y: 630, size: 12 });
      page.drawText(`Status: ${status}`, { x: 50, y: 610, size: 12 });
      page.drawText(`Ordered On: ${new Date(createdAt).toLocaleString()}`, {
        x: 50,
        y: 590,
        size: 12,
      });
      page.drawText(`Updated On: ${new Date(updatedAt).toLocaleString()}`, {
        x: 50,
        y: 570,
        size: 12,
      });

      // Table Header
      page.drawRectangle({
        x: 50,
        y: 500,
        width: 500,
        height: 20,
        color: rgb(0.85, 0.85, 0.85),
      });
      page.drawText("Item", { x: 60, y: 505, size: 12 });
      page.drawText("Quantity", { x: 200, y: 505, size: 12 });
      page.drawText("Price", { x: 300, y: 505, size: 12 });
      page.drawText("Total", { x: 450, y: 505, size: 12 });

      // Products Table
      let yOffset = 485;
      products.forEach((product) => {
        page.drawText(`${product?.id?.name?.substring(0, 10) + "..."}`, {
          x: 60,
          y: yOffset,
          size: 12,
        });
        page.drawText(`${product?.quantity}`, { x: 200, y: yOffset, size: 12 });
        page.drawText(`Rs.${product?.id?.price}`, {
          x: 300,
          y: yOffset,
          size: 12,
        });
        page.drawText(`Rs.${product?.quantity * product?.id?.price}`, {
          x: 450,
          y: yOffset,
          size: 12,
        });
        yOffset -= 20;
      });

      // Add footer
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 600,
        height: 40,
        color: rgb(0.1, 0.1, 0.1),
      });
      page.drawText("Thank you for your order!", {
        x: 230,
        y: 15,
        size: 12,
        color: rgb(1, 1, 1),
      });

      // Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF invoice:", error);
    }
  };

  return (
    <Card className="grid gap-2 p-2">
      {products.map((product) => (
        <div
          key={product._id}
          className="flex flex-col sm:flex-row justify-between items-end sm:items-center border p-3 rounded-lg bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <img
              src={product?.id?.images?.[0].url}
              alt={product?.id?.name}
              className="w-20 h-20 rounded-lg"
            />
            <div className="grid gap-1">
              <h1 className="font-semibold text-sm sm:text-lg">
                {product?.id?.name}
              </h1>
              <p className="flex text-xs sm:text-md gap-2 sm:gap-2 text-gray-500 my-2 sm:my-0">
                <span>
                  Color :{" "}
                  <span style={{ backgroundColor: product?.color }}>
                    {product?.color}
                  </span>
                </span>
                <span className="hidden sm:block">|</span>
                <span>
                  Status : <span className="capitalize">{status}</span>{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="flex sm:flex-col gap-3 sm:gap-0 mt-2 sm:mt-0 sm:items-center">
            <h2 className="text-md sm:text-xl font-bold flex items-center">
              <IndianRupee size={18} />
              {product?.id?.price}
            </h2>
            <p className="text-customYellow text-end">
              Qty: {product?.quantity}
            </p>
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <span>
          Ordered On:{" "}
          <span className="capiatalize">
            {new Date(createdAt).toLocaleString()}
          </span>
        </span>
        <span
          onClick={handleDownloadInvoice}
          className="hover:underline text-sm cursor-pointer flex items-center gap-1"
        >
          <ArrowDownToLine size={10} />
          Download Invoice
        </span>
      </div>

      <hr />
      
      {/* Shipping Information */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-600" />
          <span className="font-medium">Delivery Address:</span>
        </div>
        <div className="pl-6 text-sm text-gray-600">
          {shipping.shippingAddress ? (
            <div>
              <div className="font-medium">{shipping.shippingAddress.name}</div>
              <div>{shipping.shippingAddress.address}</div>
              <div>{shipping.shippingAddress.city}, {shipping.shippingAddress.state} - {shipping.shippingAddress.pincode}</div>
              <div>Phone: {shipping.shippingAddress.phone}</div>
            </div>
          ) : (
            <span className="capitalize">{address}</span>
          )}
        </div>

        {/* Shipping Status */}
        {shipping.shippingStatus && (
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-gray-600" />
            <span className="font-medium">Shipping Status:</span>
            <Badge className={getShippingStatusColor(shipping.shippingStatus)}>
              {shipping.shippingStatus.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        )}

        {/* AWB Code and Tracking */}
        {shipping.awbCode && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-600" />
              <span className="font-medium">Tracking:</span>
              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {shipping.awbCode}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleTrackShipment}
                disabled={loadingTracking}
                className="flex items-center gap-1"
              >
                <Truck className="h-3 w-3" />
                {loadingTracking ? "Loading..." : "Track Shipment"}
              </Button>
              
              {shipping.trackingUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(shipping.trackingUrl, '_blank')}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Track Online
                </Button>
              )}
            </div>

            {/* Tracking Data Display */}
            {trackingData && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Tracking Information:</h4>
                <div className="space-y-1 text-sm">
                  {trackingData.map((track, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{track.status}</span>
                      <span className="text-gray-500">{track.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estimated Delivery */}
        {shipping.estimatedDelivery && (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-600" />
            <span className="font-medium">Estimated Delivery:</span>
            <span className="text-sm">
              {new Date(shipping.estimatedDelivery).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrderData;
