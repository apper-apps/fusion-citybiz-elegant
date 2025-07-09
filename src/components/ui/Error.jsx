import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-surface-900 mb-4">
            Oops! Something went wrong
          </h3>
          
          <p className="text-surface-600 mb-8 leading-relaxed">
            {message}. Please try again or contact support if the problem persists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onRetry && (
              <Button onClick={onRetry} className="flex items-center gap-2">
                <ApperIcon name="RotateCcw" className="w-4 h-4" />
                Try Again
              </Button>
            )}
            
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              <ApperIcon name="Home" className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;