import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = e.target.elements;
    if (
      name.value.trim() === "" ||
      email.value.trim() === "" ||
      phone.value.trim() === "" ||
      password.value.trim() === ""
    ) {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/signup", {
        name: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      });
      const data = await res.data;
      toast({
        title: data.message,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Signup failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-black mb-4">Create Your Account</h1>
            <p className="text-gray-600 font-light">Join Madhava Silver and discover timeless elegance</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input 
                  placeholder="Enter your full name" 
                  type="text" 
                  name="name" 
                  className="w-full border-gray-200 focus:border-black focus:ring-black" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  name="email" 
                  className="w-full border-gray-200 focus:border-black focus:ring-black" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input 
                  placeholder="Enter your phone number" 
                  type="text" 
                  name="phone" 
                  className="w-full border-gray-200 focus:border-black focus:ring-black" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input 
                  placeholder="Enter your password" 
                  type="password" 
                  name="password" 
                  className="w-full border-gray-200 focus:border-black focus:ring-black" 
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
              >
                Create Account
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link to="/login" className="text-black font-medium hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;