import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import StarRating from "@/components/molecules/StarRating";
import ReviewCard from "@/components/molecules/ReviewCard";
import ReviewForm from "@/components/organisms/ReviewForm";
import { getBusinessById } from "@/services/api/businessService";
import { getReviewsByBusinessId } from "@/services/api/reviewService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const BusinessDetail = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [businessData, reviewsData] = await Promise.all([
        getBusinessById(businessId),
        getReviewsByBusinessId(businessId)
      ]);
      
      setBusiness(businessData);
      setReviews(reviewsData);
    } catch (err) {
      setError("Failed to load business details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [businessId]);

  const handleReviewAdded = () => {
    setShowReviewForm(false);
    loadData(); // Reload to get updated reviews
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!business) return <Error message="Business not found" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        {/* Business Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 shadow-premium p-8 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Building" className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-display font-bold gradient-text mb-2">
                    {business.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="primary">{business.category}</Badge>
                    <div className="flex items-center gap-1 text-surface-600">
                      <ApperIcon name="MapPin" className="w-4 h-4" />
                      <span>{business.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <StarRating 
                      rating={business.rating} 
                      size="lg" 
                      showCount={true} 
                      count={business.reviewCount} 
                    />
                  </div>
                </div>
              </div>

              <p className="text-surface-700 leading-relaxed mb-6">
                {business.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {business.phone && (
                  <Button variant="outline" size="sm">
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    {business.phone}
                  </Button>
                )}
                {business.website && (
                  <Button variant="outline" size="sm">
                    <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                  {business.address}
                </Button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="lg:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl overflow-hidden">
                {business.images && business.images.length > 0 ? (
                  <img
                    src={business.images[0]}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ApperIcon name="Building" className="w-24 h-24 text-surface-300" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-surface-900">
              Customer Reviews
            </h2>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              variant={showReviewForm ? "secondary" : "primary"}
            >
              <ApperIcon name={showReviewForm ? "X" : "Plus"} className="w-4 h-4 mr-2" />
              {showReviewForm ? "Cancel" : "Write Review"}
            </Button>
          </div>

          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm 
                businessId={businessId}
                onReviewAdded={handleReviewAdded}
              />
            </div>
          )}

          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard key={review.Id} review={review} index={index} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="MessageCircle" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-surface-900 mb-2">
                  No reviews yet
                </h3>
                <p className="text-surface-600 mb-4">
                  Be the first to share your experience with this business!
                </p>
                <Button onClick={() => setShowReviewForm(true)}>
                  <ApperIcon name="Star" className="w-4 h-4 mr-2" />
                  Write First Review
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusinessDetail;