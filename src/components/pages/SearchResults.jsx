import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import BusinessGrid from "@/components/organisms/BusinessGrid";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import { searchBusinesses } from "@/services/api/businessService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    city: "All Cities",
    category: "All Categories",
    rating: "All Ratings",
    sortBy: "rating"
  });

  const loadResults = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await searchBusinesses(searchQuery);
      setBusinesses(data);
    } catch (err) {
      setError("Failed to search businesses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      loadResults();
    }
  }, [searchQuery]);

  const applyFilters = (businesses, filters) => {
    let filtered = [...businesses];

    // Apply city filter
    if (filters.city !== "All Cities") {
      filtered = filtered.filter(business => business.city === filters.city);
    }

    // Apply category filter
    if (filters.category !== "All Categories") {
      filtered = filtered.filter(business => business.category === filters.category);
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
  if (error) return <Error message={error} onRetry={loadResults} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <ApperIcon name="Search" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">
                Search Results
              </h1>
              <p className="text-surface-600">
                {searchQuery ? `Results for "${searchQuery}"` : "Enter a search term to find businesses"}
              </p>
            </div>
          </div>
        </motion.div>

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

          {/* Results Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <BusinessGrid 
              businesses={filteredBusinesses} 
              title={`Search Results (${filteredBusinesses.length})`}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResults;