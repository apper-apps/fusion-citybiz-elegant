import reviewData from "@/services/mockData/reviews.json";

let reviews = [...reviewData];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllReviews = async () => {
  await delay(300);
  return reviews.map(review => ({ ...review }));
};

export const getReviewById = async (id) => {
  await delay(250);
  const review = reviews.find(r => r.Id === parseInt(id));
  if (!review) {
    throw new Error("Review not found");
  }
  return { ...review };
};

export const getReviewsByBusinessId = async (businessId) => {
  await delay(350);
  return reviews
    .filter(review => review.businessId === parseInt(businessId))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(review => ({ ...review }));
};

export const createReview = async (reviewData) => {
  await delay(500);
  const newId = Math.max(...reviews.map(r => r.Id)) + 1;
  const newReview = {
    Id: newId,
    ...reviewData,
    businessId: parseInt(reviewData.businessId),
    date: new Date().toISOString(),
    helpful: 0
  };
  
  reviews.push(newReview);
  return { ...newReview };
};

export const updateReview = async (id, updateData) => {
  await delay(400);
  const index = reviews.findIndex(r => r.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Review not found");
  }
  
  reviews[index] = { ...reviews[index], ...updateData };
  return { ...reviews[index] };
};

export const deleteReview = async (id) => {
  await delay(300);
  const index = reviews.findIndex(r => r.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Review not found");
  }
  
  reviews.splice(index, 1);
  return { success: true };
};