import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const Error = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-3xl font-light text-black mb-2">
                404
              </CardTitle>
              <p className="text-gray-600 font-light">Page Not Found</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-500 font-light mb-6 leading-relaxed">
                Oops! The page you're looking for doesn't exist. Let's get you back to exploring our beautiful jewellery collection.
              </p>
              <Button 
                asChild
                className="bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
              >
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Error;
