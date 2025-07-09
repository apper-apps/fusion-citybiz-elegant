import categoryData from "@/services/mockData/categories.json";

let categories = [...categoryData];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllCategories = async () => {
  await delay(300);
  return categories.map(category => ({ ...category }));
};

export const getCategoryById = async (id) => {
  await delay(250);
  const category = categories.find(c => c.Id === parseInt(id));
  if (!category) {
    throw new Error("Category not found");
  }
  return { ...category };
};

export const createCategory = async (categoryData) => {
  await delay(400);
  const newId = Math.max(...categories.map(c => c.Id)) + 1;
  const newCategory = {
    Id: newId,
    ...categoryData,
    businessCount: 0
  };
  
  categories.push(newCategory);
  return { ...newCategory };
};

export const updateCategory = async (id, updateData) => {
  await delay(350);
  const index = categories.findIndex(c => c.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  
  categories[index] = { ...categories[index], ...updateData };
  return { ...categories[index] };
};

export const deleteCategory = async (id) => {
  await delay(300);
  const index = categories.findIndex(c => c.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  
  categories.splice(index, 1);
  return { success: true };
};