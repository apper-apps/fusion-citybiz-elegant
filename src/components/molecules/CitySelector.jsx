import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CitySelector = ({ selectedCity = "All Cities", onCityChange = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const cities = [
    "All Cities",
    "Tel Aviv",
    "Jerusalem",
    "Haifa",
    "Beer Sheva",
    "Netanya",
    "Ashdod",
    "Petah Tikva",
    "Rishon LeZion",
    "Holon",
    "Ramat Gan"
  ];

  const handleCitySelect = (city) => {
    onCityChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-surface-200 rounded-xl shadow-soft hover:shadow-premium transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ApperIcon name="MapPin" className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-surface-700">{selectedCity}</span>
        <ApperIcon 
          name="ChevronDown" 
          className={`w-4 h-4 text-surface-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-surface-200 rounded-xl shadow-premium z-50"
          >
            <div className="p-2 max-h-64 overflow-y-auto">
              {cities.map((city) => (
                <motion.button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                    selectedCity === city
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-surface-700 hover:bg-surface-50"
                  }`}
                  whileHover={{ x: 2 }}
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySelector;