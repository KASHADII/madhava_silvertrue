import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  maxStars = 5, 
  size = 20, 
  interactive = true,
  showLabel = false 
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (starValue) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (interactive) {
      setHoveredRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(0);
    }
  };

  const getStarColor = (starValue) => {
    const currentRating = hoveredRating || rating;
    return starValue <= currentRating ? "#fbbf24" : "#d1d5db";
  };

  const getStarSize = () => {
    switch (size) {
      case "sm": return 16;
      case "md": return 20;
      case "lg": return 24;
      case "xl": return 32;
      default: return size;
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div 
        className="flex items-center gap-1"
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              size={getStarSize()}
              fill={getStarColor(starValue)}
              stroke={getStarColor(starValue)}
              className={`transition-colors duration-150 ${
                interactive 
                  ? "cursor-pointer hover:scale-110 transform transition-transform duration-150" 
                  : ""
              }`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
            />
          );
        })}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {rating > 0 ? `${rating} out of ${maxStars}` : "No rating"}
        </span>
      )}
    </div>
  );
};

export default StarRating;
