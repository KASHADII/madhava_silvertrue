import { Star, Heart, Eye } from "lucide-react";
import React, { useState } from "react";
import LinkButton from "./LinkButton";
import { starsGenerator } from "@/constants/helper";

const ProductCard = ({
  name = "Product Title",
  price = 2000,
  rating = 4,
  images = [{
    url: "https://images.pexels.com/photos/3801990/pexels-photo-3801990.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: "322dadaf",
  }],
  image, // For backward compatibility
  description = "",
  blacklisted = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use the first image from the images array or fallback to image prop
  const displayImage = images && images.length > 0 ? images[0] : 
    (image || {
      url: "https://images.pexels.com/photos/3801990/pexels-photo-3801990.jpeg?auto=compress&cs=tinysrgb&w=600",
      id: "default",
    });

  return (
    <div 
      className="group relative bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:border hover:border-[#C0C0C0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={displayImage.url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Quick action buttons */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
          <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:border hover:border-[#C0C0C0]">
            <Heart className="w-4 h-4 text-gray-600 group-hover:text-[#C0C0C0]" />
          </button>
          <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:border hover:border-[#C0C0C0]">
            <Eye className="w-4 h-4 text-gray-600 group-hover:text-[#C0C0C0]" />
          </button>
        </div>
        
        {/* Blacklisted badge */}
        {blacklisted && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            Not Available
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-light text-black mb-2 line-clamp-1 group-hover:text-[#C0C0C0] transition-colors duration-300" title={name}>
          {name}
        </h3>
        
        {description && (
          <p className="text-gray-600 text-sm font-light mb-4 line-clamp-2" title={description}>
            {description}
          </p>
        )}
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {starsGenerator(rating, "0", 16)}
          </div>
          <span className="text-sm text-gray-500">({rating})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-light text-black group-hover:text-[#C0C0C0] transition-colors duration-300">₹{price.toLocaleString()}</span>
        </div>
        
        {/* Action Button */}
        <LinkButton
          to={`/product/${encodeURIComponent(name)}`}
          text="View Details"
          className="w-full bg-black text-white font-medium tracking-wide py-3 hover:bg-[#C0C0C0] hover:text-black transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default ProductCard;