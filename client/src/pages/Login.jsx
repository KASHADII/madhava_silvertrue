import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setUserLogin } from "@/redux/slices/authSlice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (email.value.trim() === "" || password.value.trim() === "") {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email: email.value,
        password: password.value,
      });
      const data = await res.data;
      dispatch(setUserLogin(data));
      toast({
        title: data.message,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fffbe6]">
      <div className="bg-white border-2 border-[#D4AF37] rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6 text-center">Login to Your Account</h1>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <Input placeholder="Enter Your Email" type="email" name="email" className="rounded-full border-[#D4AF37] focus:ring-[#D4AF37]" />
          <Input placeholder="Enter Your Password" type="password" name="password" className="rounded-full border-[#D4AF37] focus:ring-[#D4AF37]" />
          <Button className="bg-[#D4AF37] text-white rounded-full font-semibold shadow hover:bg-[#bfa133] transition">Login</Button>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-sm text-gray-700">Don't have an account?</span>
            <Link to="/signup" className="text-[#D4AF37] font-semibold hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;