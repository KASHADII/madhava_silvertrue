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
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-black mb-4">Checkout</h1>
          <p className="text-gray-600 font-light">Complete your purchase</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardHeader className="bg-white border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-black font-light">
                  <ShoppingBag className="h-5 w-5 text-black" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-light text-gray-500 mb-2">
                      Your cart is empty
                    </h2>
                    <p className="text-gray-400 font-light mb-6">
                      Add some products to continue with checkout
                    </p>
                    <Button 
                      onClick={() => navigate('/catalogue')}
                      className="bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
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
              <Card className="shadow-lg border border-gray-200 bg-white mt-8">
                <CardHeader className="bg-white border-b border-gray-200">
                  <CardTitle className="flex items-center gap-2 text-black font-light">
                    <MapPin className="h-5 w-5 text-black" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Delivery Address
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete delivery address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-2 border-gray-200 focus:border-black focus:ring-black"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Total */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardHeader className="bg-white border-b border-gray-200">
                <CardTitle className="flex items-center gap-2 text-black font-light">
                  <CreditCard className="h-5 w-5 text-black" />
                  Order Total
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-light">No items in cart</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-light">Items ({totalQuantity})</span>
                      <span className="text-black font-medium">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-light">Shipping</span>
                      <span className="text-black font-medium">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-black">Total</span>
                        <span className="text-lg font-medium text-black">₹{totalPrice}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
