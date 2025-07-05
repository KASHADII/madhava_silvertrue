import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] flex items-center justify-center p-4">
      <Card className="shadow-lg border-0 bg-white max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#D4AF37] mb-2">
            404
          </CardTitle>
          <p className="text-gray-600 text-lg">Page Not Found</p>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500 mb-6">
            Oops! The page you're looking for doesn't exist. Let's get you back to exploring our beautiful jewellery collection.
          </p>
          <Button 
            asChild
            className="bg-[#D4AF37] hover:bg-[#bfa133] text-white font-semibold shadow-lg"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Error;
