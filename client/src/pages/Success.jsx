import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Sparkles } from "lucide-react";

const Success = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  setTimeout(() => {
    window.location.href = "/";
  }, 3000);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] flex items-center justify-center p-4">
      <Card className="shadow-lg border-0 bg-white max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#D4AF37] mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6" />
            Payment Successful!
            <Sparkles className="h-6 w-6" />
          </CardTitle>
          <p className="text-gray-600 text-lg">Thank you for your purchase</p>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500 mb-6">
            Your order has been confirmed and will be shipped soon. You'll receive an email confirmation shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium">
              Redirecting you to homepage in{" "}
              <span className="text-[#D4AF37] font-bold text-lg">{count}</span>{" "}
              seconds...
            </p>
          </div>
          <Button 
            asChild
            className="bg-[#D4AF37] hover:bg-[#bfa133] text-white font-semibold shadow-lg"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage Now
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
