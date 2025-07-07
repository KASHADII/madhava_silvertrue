import React from "react";
import { Link, useLocation } from "react-router-dom";
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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-6 sm:px-12 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-light tracking-tight text-black flex flex-col items-center group">
          Madhava Silver
          <span className="w-8 h-0.5 bg-black mt-1 group-hover:w-12 group-hover:bg-[#C0C0C0] transition-all duration-300"></span>
        </Link>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex gap-8 text-lg font-light items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-4 py-2 transition-all duration-200 font-light tracking-wide
                  ${location.pathname === link.to 
                    ? "text-black border-b border-black" 
                    : "text-gray-600 hover:text-[#C0C0C0] hover:border-b hover:border-[#C0C0C0]"
                  }
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Shop and User Buttons */}
        <div className="flex gap-4 items-center">
          {/* Shop/Cart Button */}
          <CartDrawer />
          
          {/* User Button */}
          {isAuthenticated ? (
            <LogoutToggle user={user} />
          ) : (
            <Link to="/login">
              <User
                size={24}
                strokeWidth={1.5}
                className="text-black hover:text-[#C0C0C0] transition cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation (for smaller screens) */}
      <div className="md:hidden mt-4">
        <ul className="flex justify-center gap-6 text-sm font-light">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-1 transition-all duration-200
                  ${location.pathname === link.to 
                    ? "text-black border-b border-black" 
                    : "text-gray-600 hover:text-[#C0C0C0] hover:border-b hover:border-[#C0C0C0]"
                  }
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
