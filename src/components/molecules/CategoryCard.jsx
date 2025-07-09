import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category, index = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.Id}`);
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
      <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 shadow-soft hover:shadow-premium transition-all duration-300 card-hover">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ApperIcon name={category.icon} className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-display font-semibold text-surface-900 group-hover:text-primary-600 transition-colors duration-300">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="primary" className="text-xs">
                {category.businessCount.toLocaleString()} businesses
              </Badge>
            </div>
          </div>
          
          <ApperIcon 
            name="ChevronRight" 
            className="w-5 h-5 text-surface-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;