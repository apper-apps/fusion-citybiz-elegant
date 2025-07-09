import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl border border-surface-200 shadow-soft overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-surface-200 to-surface-300 relative">
                <div className="absolute inset-0 shimmer-effect" />
              </div>
              
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gradient-to-r from-surface-200 to-surface-300 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 shimmer-effect" />
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 shimmer-effect" />
                  </div>
                  <div className="h-5 w-16 bg-gradient-to-r from-surface-200 to-surface-300 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 shimmer-effect" />
                  </div>
                </div>
                
                <div className="h-4 bg-gradient-to-r from-surface-200 to-surface-300 rounded relative overflow-hidden">
                  <div className="absolute inset-0 shimmer-effect" />
                </div>
                
                <div className="h-4 w-3/4 bg-gradient-to-r from-surface-200 to-surface-300 rounded relative overflow-hidden">
                  <div className="absolute inset-0 shimmer-effect" />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-4 w-24 bg-gradient-to-r from-surface-200 to-surface-300 rounded relative overflow-hidden">
                    <div className="absolute inset-0 shimmer-effect" />
                  </div>
                  <div className="h-4 w-16 bg-gradient-to-r from-surface-200 to-surface-300 rounded relative overflow-hidden">
                    <div className="absolute inset-0 shimmer-effect" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;