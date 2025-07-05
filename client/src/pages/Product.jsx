import ReviewsComponent from "@/components/custom/ReviewsComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Colors } from "@/constants/colors";
import { starsGenerator } from "@/constants/helper";
import useRazorpay from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/redux/slices/cartSlice";
import { Circle, Minus, Plus, Star, MapPin, ShoppingCart, CreditCard, Package } from "lucide-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const imagesArray = [
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 1,
  },
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 2,
  },
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 3,
  },
  {
    url: "https://images.pexels.com/photos/532173/pexels-photo-532173.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: 4,
  },
];

const productStock = 5;

const Product = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { verifyPayment, generatePayment } = useRazorpay();

  const [productQuantity, setProductQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [purchaseProduct, setPurchaseProduct] = useState(false);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [productColor, setProductColor] = useState("");

  useEffect(() => {
    const fetchProductByName = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL +
            `/get-product-by-name/${productName?.split("-").join(" ")}`
        );
        const { data } = await res.data;
        console.log(data);
        setProduct(data);
      } catch (error) {}
    };

    fetchProductByName();
  }, [productName]);

  const calculateEmi = (price) => Math.round(price / 6);

  const checkAvailability = async () => {
    if (pincode.trim() === "") {
      setAvailabilityMessage("Please enter a valid pincode");
      return;
    }
    const res = await axios.get(
      import.meta.env.VITE_API_URL + `/get-pincode/${pincode}`
    );
    const data = await res.data;
    setAvailabilityMessage(data.message);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (productColor == "") {
      toast({
        title: "Please select a color",
      });
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: productQuantity,
        image: product.images[0].url,
        color: productColor,
        stock: product.stock,
        blacklisted: product.blacklisted,
      })
    );

    setProductQuantity(1);
    toast({
      title: "Product added to cart",
    });
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (productQuantity > product.stock) {
      toast({ title: "Product out of stock" });
      return;
    }

    if (product.blacklisted) {
      toast({ title: "Product isn't available for purchase" });
      return;
    }

    if (productColor == "") {
      toast({ title: "Please select a color" });
      return;
    }

    const order = await generatePayment(product.price * productQuantity);
    await verifyPayment(
      order,
      [{ id: product._id, quantity: productQuantity, color: productColor }],
      address
    );

    setPurchaseProduct(false)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <img
                  src={product?.images?.[selectedImage]?.url}
                  className="w-full h-96 rounded-xl object-center object-cover border"
                  alt={product?.name}
                />
                <div className="grid grid-cols-4 gap-3">
                  {product?.images?.map(({ url, id }, index) => (
                    <img
                      src={url}
                      key={id}
                      onClick={() => setSelectedImage(index)}
                      className="rounded-xl filter hover:brightness-50 cursor-pointer transition-all ease-in-out duration-300 border"
                      alt={`${product?.name} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Info */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-[#D4AF37] mb-2">{product?.name}</h2>
                    <p className="text-gray-600">{product?.description}</p>
                    <div className="flex items-center mt-3">
                      {starsGenerator(product.rating, "0", 15)}
                      <span className="text-md ml-2 text-gray-600">
                        ({product?.reviews?.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-200 py-4">
                    <h3 className="text-2xl font-bold text-[#D4AF37] mb-1">
                      ₹{product.price} or ₹{calculateEmi(product.price)}/month
                    </h3>
                    <p className="text-sm text-gray-600">
                      Suggested payments with 6 months special financing
                    </p>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <h3 className="font-bold text-lg mb-3">Choose Color</h3>
                    <div className="flex items-center gap-3">
                      {product?.colors?.map((color, index) => (
                        <Circle
                          key={index + color}
                          fill={color}
                          strokeOpacity={0.2}
                          strokeWidth={0.2}
                          size={40}
                          onClick={() => setProductColor(color)}
                          className="cursor-pointer filter hover:brightness-50 transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div>
                    <h3 className="font-bold text-lg mb-3">Quantity</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <Minus
                          className="cursor-pointer text-gray-600 hover:text-[#D4AF37]"
                          onClick={() =>
                            setProductQuantity((qty) => (qty > 1 ? qty - 1 : 1))
                          }
                        />
                        <span className="font-semibold text-lg">{productQuantity}</span>
                        <Plus
                          className="cursor-pointer text-gray-600 hover:text-[#D4AF37]"
                          onClick={() =>
                            setProductQuantity((qty) =>
                              qty < productStock ? qty + 1 : qty
                            )
                          }
                        />
                      </div>

                      {product.stock - productQuantity > 0 && (
                        <div className="text-sm font-semibold text-gray-600">
                          <span>
                            Only{" "}
                            <span className="text-[#D4AF37] font-bold">
                              {product.stock - productQuantity} items{" "}
                            </span>
                            left!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pincode Check */}
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Check Availability
                    </h3>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter your pincode"
                        onChange={(e) => setPincode(e.target.value)}
                        className="flex-1 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <Button 
                        onClick={checkAvailability}
                        className="bg-[#D4AF37] hover:bg-[#bfa133]"
                      >
                        Check
                      </Button>
                    </div>
                    {availabilityMessage && (
                      <p className="text-sm mt-2 text-gray-600">{availabilityMessage}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => setPurchaseProduct(true)}
                      className="flex-1 bg-[#D4AF37] hover:bg-[#bfa133] text-white font-semibold"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleAddToCart}
                      className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>

                  {/* Buy Now Address Input */}
                  {purchaseProduct && (
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <h3 className="font-bold text-lg">Shipping Address</h3>
                      <Input
                        placeholder="Enter your complete shipping address..."
                        onChange={(e) => setAddress(e.target.value)}
                        className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <Button 
                        onClick={handleBuyNow}
                        className="w-full bg-[#D4AF37] hover:bg-[#bfa133] text-white font-semibold"
                      >
                        Confirm Order
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#edcf5d] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Customer Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ReviewsComponent productId={product?._id}/>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
