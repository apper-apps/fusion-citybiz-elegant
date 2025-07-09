import { motion } from "framer-motion";
import { format } from "date-fns";
import StarRating from "@/components/molecules/StarRating";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ReviewCard = ({ review, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 p-6 shadow-soft"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-surface-900">{review.userName}</h4>
              <p className="text-sm text-surface-600">
                {format(new Date(review.date), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={review.rating} size="sm" />
            <Badge variant="accent" className="text-xs">
              {review.rating.toFixed(1)}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-surface-700 leading-relaxed mb-4">
        {review.text}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-surface-500">
          <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
            <ApperIcon name="ThumbsUp" className="w-4 h-4" />
            <span>Helpful ({review.helpful})</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            Verified Review
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;