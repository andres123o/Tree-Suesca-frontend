import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating, size = 24, color = "gold" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const starCount = hasHalfStar ? fullStars + 1 : fullStars;

  return (
    <div className="flex items-center">
      {[...Array(starCount)].map((_, index) => {
        if (index < fullStars) {
          return <Star key={index} size={size} fill={color} color={color} />;
        } else if (hasHalfStar && index === fullStars) {
          return <StarHalf key={index} size={size} fill={color} color={color} />;
        }
        return null;
      })}
    </div>
  );
};

export default StarRating;