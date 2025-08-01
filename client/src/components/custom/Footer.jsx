import React from "react";
import { Button } from "../ui/button";
import { 
  FacebookIcon, 
  Twitter, 
  Youtube, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Heart,
  Shield,
  Truck,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-black" />
              <h3 className="text-2xl font-light text-black">Madhava Silver</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Crafting timeless elegance with passion and precision. Discover our exclusive collection of fine jewellery designed to make every moment shine.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#C0C0C0] hover:text-black transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#C0C0C0] hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#C0C0C0] hover:text-black transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#C0C0C0] hover:text-black transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-light text-black mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/myorders" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-light text-black mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#C0C0C0] transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-light text-black mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-black" />
                <span className="text-gray-600 text-sm">
                  123 Jewellery Street<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-black" />
                <span className="text-gray-600 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-black" />
                <span className="text-gray-600 text-sm">info@madhava.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-black" />
              <div>
                <h5 className="font-light text-black">Authentic Quality</h5>
                <p className="text-sm text-gray-600">Certified genuine jewellery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-black" />
              <div>
                <h5 className="font-light text-black">Free Shipping</h5>
                <p className="text-sm text-gray-600">On orders above ₹2,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-black" />
              <div>
                <h5 className="font-light text-black">Secure Payment</h5>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-black" />
              <div>
                <h5 className="font-light text-black">Customer Love</h5>
                <p className="text-sm text-gray-600">Trusted by thousands</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-xs text-gray-500">
              © 2024 Madhava Silver. All rights reserved.
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Made with</span>
            <Heart className="h-3 w-3 text-[#D4AF37]" />
            <span className="text-xs text-gray-500">in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;