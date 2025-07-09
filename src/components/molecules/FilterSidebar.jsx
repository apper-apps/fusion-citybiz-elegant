import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      city: "All Cities",
      category: "All Categories",
      rating: "All Ratings",
      sortBy: "rating"
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

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

  const categories = [
    "All Categories",
    "Restaurants",
    "Healthcare",
    "Shopping",
    "Services",
    "Entertainment",
    "Beauty & Wellness",
    "Education",
    "Automotive",
    "Home & Garden",
    "Technology"
  ];

  const ratings = [
    "All Ratings",
    "4+ Stars",
    "3+ Stars",
    "2+ Stars",
    "1+ Stars"
  ];

  const sortOptions = [
    { value: "rating", label: "Best Rated" },
    { value: "reviews", label: "Most Reviews" },
    { value: "name", label: "Name A-Z" },
    { value: "newest", label: "Newest First" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-surface-900">
          Filter Results
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="city-filter">City</Label>
          <Select
            id="city-filter"
            value={localFilters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="category-filter">Category</Label>
          <Select
            id="category-filter"
            value={localFilters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="rating-filter">Minimum Rating</Label>
          <Select
            id="rating-filter"
            value={localFilters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="sort-filter">Sort By</Label>
          <Select
            id="sort-filter"
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;