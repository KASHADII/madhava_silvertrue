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
}) => {
  return (
    <div className="relative bg-white border-2 border-[#D4AF37] w-fit overflow-clip grid z-1 hover:shadow-2xl rounded-3xl transition-transform duration-300 hover:scale-105">
      <img
        src={image.url}
        alt={name}
        className="object-cover w-[22rem] h-[18rem] rounded-t-3xl border-b-2 border-[#D4AF37]"
      />
      <div className="px-5 py-4 grid gap-2">
        <h2 className="text-xl font-semibold text-[#D4AF37] mb-1 truncate">{name}</h2>
        <div className="flex justify-between items-center mb-2">
          <div className="flex">{starsGenerator(rating)}</div>
          <span className="text-lg font-bold text-[#D4AF37]">₹{price}</span>
        </div>
        <LinkButton
          to={`/product/${name.split(" ").join("-")}`}
          text="View Product"
          className="bg-[#D4AF37] text-white rounded-full px-4 py-2 font-semibold shadow hover:bg-[#bfa133] transition"
        />
      </div>
      {/* Decorative gold accent */}
      <div className="absolute top-0 right-0 w-10 h-10 bg-[#D4AF37] rounded-bl-3xl"></div>
    </div>
  );
};

export default ProductCard;