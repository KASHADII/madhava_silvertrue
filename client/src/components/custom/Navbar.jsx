import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import CustomerSupport from "./CustomerSupport";
import { User, MapPin, Store, Heart, Search as SearchIcon } from "lucide-react";
import LogoutToggle from "./LogoutToggle";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/catalogue", label: "Catalogue" },
];

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const [pincodeOpen, setPincodeOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");

  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/categories/get-categories");
        setCategories(res.data.data || []);
      } catch (e) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handlePincodeCheck = async () => {
    if (!pincode || pincode.trim().length === 0) {
      setPincodeMsg("Please enter a valid pincode");
      return;
    }
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/pincodes/get-pincode/${pincode}`
      );
      const data = await res.data;
      setPincodeMsg(data.message || "");
    } catch (e) {
      setPincodeMsg("Could not verify pincode");
    }
  };

  const submitSearch = (e) => {
    e?.preventDefault?.();
    if (!searchText.trim()) return;
    navigate("/catalogue");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-6 sm:px-12 py-4">
      <div className="flex items-center gap-4 justify-between">
        {/* Left: Logo + Pincode */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-light tracking-tight text-black flex flex-col items-center group">
            Madhava Silver
            <span className="w-8 h-0.5 bg-black mt-1 group-hover:w-12 group-hover:bg-[#C0C0C0] transition-all duration-300"></span>
          </Link>

          {/* Pincode */}
          <Dialog open={pincodeOpen} onOpenChange={setPincodeOpen}>
            <DialogTrigger asChild>
              <button className="hidden lg:flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm hover:border-black">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Where to Deliver?</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Delivery Pincode</DialogTitle>
                <DialogDescription>Enter your pincode to check delivery availability.</DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <Input placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                <Button onClick={handlePincodeCheck}>Check</Button>
              </div>
              {pincodeMsg && <p className="text-sm text-gray-600">{pincodeMsg}</p>}
            </DialogContent>
          </Dialog>
        </div>

        {/* Center: Search */}
        <form onSubmit={submitSearch} className="flex-1 max-w-3xl hidden md:block">
          <div className="relative">
            <Input
              placeholder='Search "Bracelets"'
              className="pl-10 h-11"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </form>

        {/* Right: Icons */}
        <div className="flex gap-5 items-center">
          {isAuthenticated ? (
            <LogoutToggle user={user} />
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-sm">
              <User size={20} strokeWidth={1.5} />
              <span className="hidden sm:inline uppercase tracking-wide">Account</span>
            </Link>
          )}

          <CustomerSupport />

          <button className="hidden sm:flex items-center gap-2 text-sm">
            <Heart size={20} strokeWidth={1.5} />
            <span className="uppercase tracking-wide">Wishlist</span>
          </button>

          <CartDrawer showLabel />
        </div>
      </div>

      {/* Secondary navigation row */}
      <div className="hidden md:flex items-center justify-center gap-6 mt-3 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <span className="font-medium">Shop by Category</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.length === 0 && (
              <DropdownMenuItem disabled>No categories</DropdownMenuItem>
            )}
            {categories.map((c) => (
              <DropdownMenuItem key={c._id} onClick={() => navigate("/catalogue")}>{c.name}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link to="#" className="text-gray-700 hover:text-black">Gold with Lab Diamonds</Link>

        <Link to="#" className="text-gray-700 hover:text-black">Madhava Gift Card</Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-black">Gift Store</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>For Her</DropdownMenuItem>
            <DropdownMenuItem>For Him</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-black">Men's Jewellery</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Bracelets</DropdownMenuItem>
            <DropdownMenuItem>Chains</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-black">Latest Collections</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>New Arrivals</DropdownMenuItem>
            <DropdownMenuItem>Best Sellers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-black">More at Madhava Silver</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/catalogue")}>Catalogue</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile: compact links */}
      <div className="md:hidden mt-4">
        <ul className="flex justify-center gap-6 text-sm font-light">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-1 transition-all duration-200
                  ${location.pathname === link.to 
                    ? "text-black border-b border-black" 
                    : "text-gray-600 hover:text-[#C0C0C0] hover:border-b hover:border-[#C0C0C0]"}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
