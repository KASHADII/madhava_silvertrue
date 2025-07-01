import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { ModeToggle } from "./ModeToggle"; // Removed
import CartDrawer from "./CartDrawer";
import { User } from "lucide-react";
import LogoutToggle from "./LogoutToggle";
import { useSelector } from "react-redux";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/catalogue", label: "Catalogue" },
];

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-[#E5C16C] shadow-sm px-6 sm:px-12 py-4">
      <div className="relative flex items-center justify-center">
        {/* Left: Icons */}
        <div className="absolute left-0 flex gap-3 items-center h-full">
          {/* <ModeToggle /> */}
          <CartDrawer />
          {isAuthenticated ? (
            <LogoutToggle user={user} />
          ) : (
            <Link to="/login">
              <User
                size={28}
                strokeWidth={1.3}
                className="text-[#D4AF37] hover:scale-110 transition cursor-pointer"
              />
            </Link>
          )}
        </div>
        {/* Center: Brand */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight text-[#D4AF37] flex flex-col items-center group mx-auto">
          Madhava Silver
          <span className="w-10 h-1 bg-gradient-to-r from-[#D4AF37] to-[#fffbe6] rounded-full mt-1 group-hover:w-16 transition-all duration-300"></span>
        </Link>
        {/* Right: Nav Links */}
        <ul className="absolute right-0 hidden sm:flex gap-6 text-lg font-medium items-center h-full">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-1 rounded-full transition-all duration-200
                  ${location.pathname === link.to ? "bg-[#fffbe6] text-[#D4AF37] font-bold border border-[#E5C16C] shadow" : "text-gray-700 hover:text-[#D4AF37] hover:bg-[#fffbe6]"}
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
