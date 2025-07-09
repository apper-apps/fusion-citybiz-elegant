import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  message = "No items found", 
  description = "There are no items to display at the moment.",
  actionText = "Get Started",
  actionLink = "/",
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name={icon} className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-surface-900 mb-4">
            {message}
          </h3>
          
          <p className="text-surface-600 mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to={actionLink}>
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                {actionText}
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/">
                <ApperIcon name="Home" className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;