import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BusinessGrid from "@/components/organisms/BusinessGrid";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import { getBusinessesByCategory } from "@/services/api/businessService";
import { getCategoryById } from "@/services/api/categoryService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const CategoryListing = () => {
  const { categoryId } = useParams();
  const [businesses, setBusinesses] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    city: "All Cities",
    category: "All Categories",
    rating: "All Ratings",
    sortBy: "rating"
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [businessData, categoryData] = await Promise.all([
        getBusinessesByCategory(categoryId),
        getCategoryById(categoryId)
      ]);
      
      setBusinesses(businessData);
      setCategory(categoryData);
    } catch (err) {
      setError("Failed to load category data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [categoryId]);

  const applyFilters = (businesses, filters) => {
    let filtered = [...businesses];

    // Apply city filter
    if (filters.city !== "All Cities") {
      filtered = filtered.filter(business => business.city === filters.city);
    }

    // Apply rating filter
    if (filters.rating !== "All Ratings") {
      const minRating = parseInt(filters.rating.split("+")[0]);
      filtered = filtered.filter(business => business.rating >= minRating);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredBusinesses = applyFilters(businesses, filters);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <ApperIcon name={category.icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold gradient-text">
                  {category.name}
                </h1>
                <p className="text-surface-600">
                  {category.businessCount} businesses in this category
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </motion.div>

          {/* Business Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <BusinessGrid 
              businesses={filteredBusinesses} 
              title={`${category?.name || "Category"} Businesses`}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryListing;