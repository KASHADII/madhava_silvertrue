import CheckoutProduct from "@/components/custom/CheckoutProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useErrorLogout from "@/hooks/use-error-logout";
import useRazorpay from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";
import { emptyCart } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, CreditCard, MapPin, User, Mail } from "lucide-react";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleCheckout = async () => {
    if (address.trim() === "") {
      return toast({
        title: "Please enter your address",
        variant: "destructive",
      });
    }

    const productArray = cartItems.map((item) => {
      return {
        id: item._id,
        quantity: item.quantity,
        color: item.color,
      };
    });

    try {
      const options = await generatePayment(totalPrice);
      const success = verifyPayment(options, productArray, address);
      dispatch(emptyCart());
    } catch (error) {
      return handleErrorLogout(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-500 mb-2">
                      Your cart is empty
                    </h2>
                    <p className="text-gray-400 mb-4">
                      Add some products to continue with checkout
                    </p>
                    <Button 
                      onClick={() => navigate('/catalogue')}
                      className="bg-[#D4AF37] hover:bg-[#bfa133]"
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CheckoutProduct key={item?._id} {...item} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Details */}
            {cartItems.length > 0 && (
              <Card className="mt-6 shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37]">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                      <span className="font-semibold">₹{totalPrice?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">₹0.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
                      <span className="text-lg font-bold text-[#D4AF37]">Total</span>
                      <span className="text-lg font-bold text-[#D4AF37]">₹{totalPrice?.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Billing Information */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white sticky top-8">
              <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="mt-1 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      value={user?.name}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="mt-1 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      value={user?.email}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </Label>
                    <Textarea
                      rows="4"
                      id="address"
                      placeholder="Enter your complete shipping address..."
                      className="mt-1 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37] resize-none"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-[#D4AF37] hover:bg-[#bfa133] text-white font-semibold py-3 text-lg shadow-lg"
                    disabled={cartItems.length === 0}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Place Order - ₹{totalPrice?.toFixed(2)}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
