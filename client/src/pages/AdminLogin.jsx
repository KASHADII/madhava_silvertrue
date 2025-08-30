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
          import.meta.env.VITE_API_URL + "/auth/admin-login",
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
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-light text-black mb-2">
                Admin Login
              </CardTitle>
              <p className="text-gray-600 font-light">Access your admin dashboard</p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    Username
                  </label>
                  <Input 
                    placeholder="Enter your username" 
                    type="text" 
                    name="username"
                    className="border-gray-200 focus:border-black focus:ring-black"
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
                    className="border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Login to Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
