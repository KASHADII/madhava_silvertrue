import CheckoutProduct from "@/components/custom/CheckoutProduct";
import AvailableDiscounts from "@/components/custom/AvailableDiscounts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useErrorLogout from "@/hooks/use-error-logout";
import useRazorpay from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";
import { emptyCart, applyDiscount, removeDiscount } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, CreditCard, MapPin, User, Mail, Tag, X } from "lucide-react";
import axios from "axios";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const { cartItems, totalQuantity, totalPrice, appliedDiscount, discountAmount, finalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast({
        title: "Please enter a discount code",
        variant: "destructive",
      });
      return;
    }

    setApplyingDiscount(true);
    try {
      const cartItemsForAPI = cartItems.map(item => ({
        productId: item._id,
        category: item.category,
        quantity: item.quantity
      }));

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/discounts/apply",
        {
          code: discountCode.trim(),
          userId: user._id,
          cartValue: totalPrice,
          cartItems: cartItemsForAPI,
          mockMode: false
        }
      );

      if (response.data.success) {
        dispatch(applyDiscount({
          discount: {
            code: discountCode.trim(),
            type: response.data.type
          },
          discountAmount: response.data.discountAmount
        }));
        
        toast({
          title: "Discount Applied!",
          description: `You saved ₹${response.data.discountAmount}`,
        });
        setDiscountCode("");
      }
    } catch (error) {
      toast({
        title: "Discount Error",
        description: error.response?.data?.message || "Failed to apply discount code",
        variant: "destructive",
      });
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscount());
    toast({
      title: "Discount Removed",
      description: "Discount code has been removed",
    });
  };

  const handleApplyDiscountFromList = (code) => {
    setDiscountCode(code);
    handleApplyDiscount();
  };

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
      const options = await generatePayment(finalPrice);
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

            {/* Discount Code Section */}
            {cartItems.length > 0 && (
              <Card className="shadow-lg border border-gray-200 bg-white mt-8">
                <CardHeader className="bg-white border-b border-gray-200">
                  <CardTitle className="flex items-center gap-2 text-black font-light">
                    <Tag className="h-5 w-5 text-black" />
                    Discount Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {appliedDiscount ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Tag className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-green-800">
                              {appliedDiscount.code} applied
                            </p>
                            <p className="text-sm text-green-600">
                              You saved ₹{discountAmount}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveDiscount}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Input
                          placeholder="Enter discount code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="flex-1 border-gray-200 focus:border-black focus:ring-black"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleApplyDiscount();
                            }
                          }}
                        />
                        <Button
                          onClick={handleApplyDiscount}
                          disabled={applyingDiscount || !discountCode.trim()}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          {applyingDiscount ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Enter your discount code to save on your order
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Available Discounts Section */}
            {cartItems.length > 0 && (
              <div className="mt-8">
                <AvailableDiscounts 
                  onApplyDiscount={handleApplyDiscountFromList}
                  appliedDiscountCode={appliedDiscount?.code}
                  cartValue={totalPrice}
                />
                
              </div>
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
                    {appliedDiscount && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-light">Discount ({appliedDiscount.code})</span>
                        <span className="text-green-600 font-medium">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-black">Total</span>
                        <span className="text-lg font-medium text-black">₹{finalPrice}</span>
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
