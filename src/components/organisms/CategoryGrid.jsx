import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CategoryCard from "@/components/molecules/CategoryCard";
import { getAllCategories } from "@/services/api/categoryService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCategories} />;
  if (categories.length === 0) return <Empty message="No categories found" />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Find exactly what you're looking for in our comprehensive directory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.Id} category={category} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CategoryGrid;