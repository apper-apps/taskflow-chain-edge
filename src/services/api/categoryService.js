import mockCategories from "@/services/mockData/categories.json";

// In-memory storage
let categories = [...mockCategories];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAll = async () => {
  await delay(250);
  return [...categories];
};

export const getById = async (id) => {
  await delay(200);
  const category = categories.find(cat => cat.Id === parseInt(id));
  if (!category) {
    throw new Error("Category not found");
  }
  return { ...category };
};

export const create = async (categoryData) => {
  await delay(300);
  
  const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
  const newCategory = {
    Id: maxId + 1,
    ...categoryData,
    taskCount: 0
  };
  
  categories.push(newCategory);
  return { ...newCategory };
};

export const update = async (id, categoryData) => {
  await delay(250);
  
  const index = categories.findIndex(cat => cat.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  
  const updatedCategory = {
    ...categories[index],
    ...categoryData,
    Id: parseInt(id)
  };
  
  categories[index] = updatedCategory;
  return { ...updatedCategory };
};

export const delete_ = async (id) => {
  await delay(250);
  
  const index = categories.findIndex(cat => cat.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Category not found");
  }
  
  categories.splice(index, 1);
  return true;
};

// Export delete function with underscore to avoid reserved keyword
export { delete_ as delete };