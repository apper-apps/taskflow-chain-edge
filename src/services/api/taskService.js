import mockTasks from "@/services/mockData/tasks.json";

// In-memory storage
let tasks = [...mockTasks];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAll = async () => {
  await delay(300);
  return [...tasks];
};

export const getById = async (id) => {
  await delay(200);
  const task = tasks.find(task => task.Id === parseInt(id));
  if (!task) {
    throw new Error("Task not found");
  }
  return { ...task };
};

export const create = async (taskData) => {
  await delay(400);
  
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
  const newTask = {
    Id: maxId + 1,
    ...taskData,
    createdAt: new Date().toISOString(),
    completedAt: null
  };
  
  tasks.push(newTask);
  return { ...newTask };
};

export const update = async (id, taskData) => {
  await delay(300);
  
  const index = tasks.findIndex(task => task.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Task not found");
  }
  
  const updatedTask = {
    ...tasks[index],
    ...taskData,
    Id: parseInt(id)
  };
  
  tasks[index] = updatedTask;
  return { ...updatedTask };
};

export const delete_ = async (id) => {
  await delay(300);
  
  const index = tasks.findIndex(task => task.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Task not found");
  }
  
  tasks.splice(index, 1);
  return true;
};

// Export delete function with underscore to avoid reserved keyword
export { delete_ as delete };