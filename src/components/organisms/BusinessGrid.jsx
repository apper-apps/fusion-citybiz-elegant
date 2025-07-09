import { motion } from "framer-motion";
import BusinessCard from "@/components/molecules/BusinessCard";
import Empty from "@/components/ui/Empty";

const BusinessGrid = ({ businesses, title = "Businesses" }) => {
  if (businesses.length === 0) {
    return <Empty message="No businesses found" actionText="Add Business" actionLink="/add-business" />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-surface-900 mb-2">
          {title}
        </h2>
        <p className="text-surface-600">
          {businesses.length} {businesses.length === 1 ? "business" : "businesses"} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business, index) => (
          <BusinessCard key={business.Id} business={business} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default BusinessGrid;