import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { setUserLogin } from "@/redux/slices/authSlice";
import { Shield, User, Lock } from "lucide-react";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !password) {
      return toast({
        title: "Please enter username and password",
        variant: "destructive",
      });
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/admin-login",
        { username, password }
      );
      const data = await res.data;
      dispatch(setUserLogin(data));
      toast({
        title: data.message,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error)
      return toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbe6] to-[#fff] flex items-center justify-center p-4">
      <Card className="shadow-lg border-0 bg-white max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#D4AF37] mb-2">
            Admin Login
          </CardTitle>
          <p className="text-gray-600">Access your admin dashboard</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4" />
                Username
              </label>
              <Input 
                placeholder="Enter your username" 
                type="text" 
                name="username"
                className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <Input 
                placeholder="Enter your password" 
                type="password" 
                name="password"
                className="border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#bfa133] text-white font-semibold shadow-lg"
            >
              <Shield className="h-4 w-4 mr-2" />
              Login to Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
