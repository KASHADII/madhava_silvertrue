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
    <div className="flex items-center justify-center min-h-screen bg-[#fffbe6]">
      <div className="bg-white border-2 border-[#D4AF37] rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6 text-center">Create Your Account</h1>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <Input placeholder="Enter Your Name" type="text" name="name" className="rounded-full border-[#D4AF37] focus:ring-[#D4AF37]" />
          <Input placeholder="Enter Your Email" type="email" name="email" className="rounded-full border-[#D4AF37] focus:ring-[#D4AF37]" />
          <Input placeholder="Enter Your Phone" type="text" name="phone" className="rounded-full border-[#D4AF37] focus:ring-[#D4AF37]" />
          <Input placeholder="Enter Your Password" type="password" name="password" className="rounded-full border-[#D4AF37] focus:ring-[#D4AF37]" />
          <Button className="bg-[#D4AF37] text-white rounded-full font-semibold shadow hover:bg-[#bfa133] transition">Sign Up</Button>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-sm text-gray-700">Already have an account?</span>
            <Link to="/login" className="text-[#D4AF37] font-semibold hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;