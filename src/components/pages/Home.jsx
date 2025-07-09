import { motion } from "framer-motion";
import FeaturedBusinesses from "@/components/organisms/FeaturedBusinesses";
import CategoryGrid from "@/components/organisms/CategoryGrid";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6"
            >
              Discover Local Businesses
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-surface-600 mb-8 leading-relaxed"
            >
              Find the best-rated restaurants, services, and shops in your city. 
              Connect with local businesses and read authentic reviews from your community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <SearchBar 
                placeholder="Search for restaurants, services, shops..." 
                className="mb-8"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-8 text-sm text-surface-600"
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" className="w-4 h-4 text-primary-500" />
                <span>City-based listings</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Star" className="w-4 h-4 text-accent-500" />
                <span>Verified reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" className="w-4 h-4 text-secondary-500" />
                <span>Real-time updates</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <FeaturedBusinesses />

      {/* Categories */}
      <CategoryGrid />

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-16 bg-gradient-to-br from-surface-900 to-surface-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                10,000+
              </div>
              <div className="text-surface-300">Local Businesses</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                50,000+
              </div>
              <div className="text-surface-300">Customer Reviews</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                25+
              </div>
              <div className="text-surface-300">Cities Covered</div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;