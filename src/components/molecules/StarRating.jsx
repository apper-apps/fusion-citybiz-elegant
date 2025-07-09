import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StarRating = ({ rating = 0, maxRating = 5, showCount = false, count = 0, size = "md", readonly = true, onRatingChange = null }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const handleStarClick = (starIndex) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => (
          <motion.button
            key={index}
            type="button"
            onClick={() => handleStarClick(index)}
            disabled={readonly}
            className={readonly ? "cursor-default" : "cursor-pointer"}
            whileHover={readonly ? {} : { scale: 1.1 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
          >
            <ApperIcon
              name="Star"
              className={`${sizes[size]} ${
                index < rating
                  ? "text-accent-500 fill-accent-500"
                  : "text-surface-300"
              } transition-all duration-300`}
            />
          </motion.button>
        ))}
      </div>
      
      {showCount && (
        <span className={`text-surface-600 ${textSizes[size]}`}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default StarRating;