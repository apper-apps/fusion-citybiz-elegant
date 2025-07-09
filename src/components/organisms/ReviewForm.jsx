import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import TextArea from "@/components/atoms/TextArea";
import Label from "@/components/atoms/Label";
import StarRating from "@/components/molecules/StarRating";
import { createReview } from "@/services/api/reviewService";
import ApperIcon from "@/components/ApperIcon";

const ReviewForm = ({ businessId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setLoading(true);
      const newReview = {
        businessId,
        rating,
        text: reviewText.trim(),
        userName: "Anonymous User", // Simulated user
        date: new Date().toISOString(),
        helpful: 0
      };

      await createReview(newReview);
      
      toast.success("Review submitted successfully!");
      setRating(0);
      setReviewText("");
      
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-surface-200 p-6 shadow-soft"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <ApperIcon name="Star" className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-surface-900">
            Write a Review
          </h3>
          <p className="text-sm text-surface-600">
            Share your experience with this business
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Your Rating</Label>
          <div className="flex items-center gap-4">
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              readonly={false}
              size="lg"
            />
            <span className="text-sm text-surface-600">
              {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="review-text">Your Review</Label>
          <TextArea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell others about your experience..."
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading || rating === 0 || !reviewText.trim()}
            className="min-w-32"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;