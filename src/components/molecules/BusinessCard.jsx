import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/atoms/Badge";
import StarRating from "@/components/molecules/StarRating";
import ApperIcon from "@/components/ApperIcon";

const BusinessCard = ({ business, index = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/business/${business.Id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 shadow-soft hover:shadow-premium transition-all duration-300 card-hover overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
          {business.images && business.images.length > 0 ? (
            <img
              src={business.images[0]}
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ApperIcon name="Building" className="w-16 h-16 text-surface-300" />
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <Badge variant="accent" className="text-xs font-bold">
              {business.rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-surface-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
              {business.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="text-xs">
              {business.category}
            </Badge>
            <div className="flex items-center gap-1 text-surface-600">
              <ApperIcon name="MapPin" className="w-3 h-3" />
              <span className="text-xs">{business.city}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <StarRating 
              rating={business.rating} 
              size="sm" 
              showCount={true} 
              count={business.reviewCount} 
            />
          </div>
          
          <p className="text-sm text-surface-600 line-clamp-2 mb-3">
            {business.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-surface-500">
            {business.phone && (
              <div className="flex items-center gap-1">
                <ApperIcon name="Phone" className="w-3 h-3" />
                <span>{business.phone}</span>
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-1">
                <ApperIcon name="Globe" className="w-3 h-3" />
                <span>Website</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCard;