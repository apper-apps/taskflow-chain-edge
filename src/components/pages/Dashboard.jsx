import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { isToday, isBefore, startOfDay } from "date-fns";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import Modal from "@/components/organisms/Modal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import * as taskService from "@/services/api/taskService";
import * as categoryService from "@/services/api/categoryService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getTaskCounts = () => {
    const today = startOfDay(new Date());
    
    return {
      all: tasks.length,
      today: tasks.filter(task => task.dueDate && isToday(new Date(task.dueDate))).length,
      overdue: tasks.filter(task => 
        task.dueDate && 
        task.status !== "completed" && 
        isBefore(new Date(task.dueDate), today)
      ).length,
      completed: tasks.filter(task => task.status === "completed").length,
      total: tasks.length
    };
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (selectedCategory === "today") {
      filtered = filtered.filter(task => task.dueDate && isToday(new Date(task.dueDate)));
    } else if (selectedCategory === "overdue") {
      const today = startOfDay(new Date());
      filtered = filtered.filter(task => 
        task.dueDate && 
        task.status !== "completed" && 
        isBefore(new Date(task.dueDate), today)
      );
    } else if (selectedCategory === "completed") {
      filtered = filtered.filter(task => task.status === "completed");
    } else if (selectedCategory.startsWith("category-")) {
      const categoryId = selectedCategory.replace("category-", "");
      filtered = filtered.filter(task => task.categoryId === categoryId);
    }

    return filtered;
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(t => t.Id === editingTask.Id ? updatedTask : t));
        toast.success("Task updated successfully");
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prev => [...prev, newTask]);
        toast.success("Task created successfully");
      }
      
      setIsTaskModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to save task");
      throw err;
    }
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const taskCounts = getTaskCounts();
  const filteredTasks = getFilteredTasks();

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          taskCounts={taskCounts}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50"
            >
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={(category) => {
                  setSelectedCategory(category);
                  setIsSidebarOpen(false);
                }}
                taskCounts={taskCounts}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onCreateTask={handleCreateTask}
          onSearch={setSearchTerm}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          taskCounts={taskCounts}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <TaskList
              onCreateTask={handleCreateTask}
              onEditTask={handleEditTask}
            />
          </div>
        </main>
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
        size="lg"
      >
        <TaskForm
          task={editingTask}
          categories={categories}
          onSubmit={handleTaskSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;