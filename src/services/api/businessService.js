import businessData from "@/services/mockData/businesses.json";

let businesses = [...businessData];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllBusinesses = async () => {
  await delay(300);
  return businesses.map(business => ({ ...business }));
};

export const getBusinessById = async (id) => {
  await delay(250);
  const business = businesses.find(b => b.Id === parseInt(id));
  if (!business) {
    throw new Error("Business not found");
  }
  return { ...business };
};

export const getBusinessesByCategory = async (categoryId) => {
  await delay(350);
  const categoryMap = {
    "1": "Restaurants",
    "2": "Healthcare", 
    "3": "Shopping",
    "4": "Services",
    "5": "Entertainment",
    "6": "Beauty & Wellness",
    "7": "Education",
    "8": "Automotive",
    "9": "Home & Garden",
    "10": "Technology"
  };
  
  const categoryName = categoryMap[categoryId];
  if (!categoryName) {
    return [];
  }
  
  return businesses
    .filter(business => business.category === categoryName)
    .map(business => ({ ...business }));
};

export const getTopRatedBusinesses = async (limit = 10) => {
  await delay(400);
  return businesses
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map(business => ({ ...business }));
};

export const searchBusinesses = async (query) => {
  await delay(350);
  if (!query.trim()) {
    return [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  return businesses
    .filter(business => 
      business.name.toLowerCase().includes(searchTerm) ||
      business.category.toLowerCase().includes(searchTerm) ||
      business.description.toLowerCase().includes(searchTerm) ||
      business.city.toLowerCase().includes(searchTerm)
    )
    .map(business => ({ ...business }));
};

export const createBusiness = async (businessData) => {
  await delay(500);
  const newId = Math.max(...businesses.map(b => b.Id)) + 1;
  const newBusiness = {
    Id: newId,
    ...businessData,
    rating: 0,
    reviewCount: 0,
    isApproved: false,
    images: businessData.images || []
  };
  
  businesses.push(newBusiness);
  return { ...newBusiness };
};

export const updateBusiness = async (id, updateData) => {
  await delay(400);
  const index = businesses.findIndex(b => b.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Business not found");
  }
  
  businesses[index] = { ...businesses[index], ...updateData };
  return { ...businesses[index] };
};

export const deleteBusiness = async (id) => {
  await delay(300);
  const index = businesses.findIndex(b => b.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Business not found");
  }
  
  businesses.splice(index, 1);
  return { success: true };
};