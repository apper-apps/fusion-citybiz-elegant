import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ placeholder = "Search businesses...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 bg-white/80 backdrop-blur-sm border-surface-200 focus:border-primary-500 shadow-soft"
          />
          <ApperIcon
            name="Search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5"
          />
        </div>
        
        <Button
          type="submit"
          size="md"
          className="px-6 shadow-soft"
          disabled={!searchTerm.trim()}
        >
          <ApperIcon name="Search" className="w-5 h-5" />
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;