import { Star } from "lucide-react";
import React from "react";
import LinkButton from "./LinkButton";
import { starsGenerator } from "@/constants/helper";

const ProductCard = ({
  name = "Product Title",
  price = 2000,
  rating = 4,
  image = {
    url: "https://images.pexels.com/photos/3801990/pexels-photo-3801990.jpeg?auto=compress&cs=tinysrgb&w=600",
    id: "322dadaf",
  },
  description = "",
  blacklisted = false,
}) => {
  return (
    <div className="relative bg-white border border-[#E5C16C] shadow-lg rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] to-[#fffbe6] z-10" />
      {/* Blacklisted badge */}
      {blacklisted && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-20 shadow">Not Available</span>
      )}
      {/* Product Image */}
      <div className="overflow-hidden h-60 flex items-center justify-center bg-[#f9f6ef]">
        <img
          src={image.url}
          alt={name}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h2 className="text-lg font-bold text-[#D4AF37] truncate" title={name}>{name}</h2>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-extrabold text-[#222]">₹{price}</span>
          <span className="ml-auto flex">{starsGenerator(rating, "0", 18)}</span>
        </div>
        {description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-2" title={description}>{description}</p>
        )}
        <LinkButton
          to={`/product/${name.split(" ").join("-")}`}
          text="View Details"
          className="w-full bg-[#D4AF37] text-white rounded-full py-2 font-semibold shadow hover:bg-[#bfa133] transition mt-auto"
        />
      </div>
    </div>
  );
};

export default ProductCard;