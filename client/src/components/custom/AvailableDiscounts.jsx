import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tag, Clock, Percent, DollarSign, Truck } from "lucide-react";
import axios from "axios";

const AvailableDiscounts = ({ onApplyDiscount, appliedDiscountCode, cartValue = 0 }) => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailableDiscounts();
  }, []);

  const fetchAvailableDiscounts = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const url = `${apiUrl}/discounts/available`;
      console.log("Fetching discounts from:", url);
      
      const response = await axios.get(url);
      console.log("Discounts API response:", response.data);
      
      if (response.data.success) {
        setDiscounts(response.data.data);
        console.log("Available discounts:", response.data.data);
      } else {
        console.error("API returned success: false", response.data);
        toast({
          title: "Warning",
          description: "No discounts available",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Failed to fetch discounts:", error);
      console.error("Error details:", error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load available discounts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async (discount) => {
    if (onApplyDiscount) {
      onApplyDiscount(discount.code);
    }
  };

  const getDiscountIcon = (type) => {
    switch (type) {
      case "flat":
        return <DollarSign className="h-4 w-4" />;
      case "percentage":
        return <Percent className="h-4 w-4" />;
      case "free_shipping":
        return <Truck className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const getDiscountValue = (discount) => {
    switch (discount.type) {
      case "flat":
        return `₹${discount.value} off`;
      case "percentage":
        return `${discount.value}% off`;
      case "free_shipping":
        return "Free Shipping";
      default:
        return "";
    }
  };

  const isDiscountEligible = (discount) => {
    if (discount.minOrderValue && cartValue < discount.minOrderValue) {
      return false;
    }
    return true;
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Available Discounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-gray-500">Loading discounts...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (discounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Available Discounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-gray-500">No discounts available at the moment</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Available Discounts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {discounts.map((discount) => {
            const isEligible = isDiscountEligible(discount);
            const daysRemaining = getDaysRemaining(discount.endDate);
            const isApplied = appliedDiscountCode === discount.code;

            return (
              <div
                key={discount._id}
                className={`p-4 border rounded-lg transition-all ${
                  isApplied
                    ? "border-green-200 bg-green-50"
                    : isEligible
                    ? "border-gray-200 bg-white hover:border-gray-300"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getDiscountIcon(discount.type)}
                      <span className="font-medium text-lg">{discount.code}</span>
                      <Badge variant={isApplied ? "default" : "secondary"}>
                        {getDiscountValue(discount)}
                      </Badge>
                    </div>
                    
                    <div className="text-gray-600 text-sm mb-2">
                      {discount.description}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {daysRemaining > 0
                            ? `${daysRemaining} days left`
                            : "Expires soon"}
                        </span>
                      </div>
                      
                      {discount.minOrderValue && (
                        <div>
                          Min order: ₹{discount.minOrderValue}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {isApplied ? (
                      <Button size="sm" variant="outline" disabled className="bg-green-100 text-green-800 border-green-200">
                        Applied
                      </Button>
                    ) : isEligible ? (
                      <Button
                        size="sm"
                        onClick={() => handleApplyDiscount(discount)}
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        Apply
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Not Eligible
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableDiscounts;
