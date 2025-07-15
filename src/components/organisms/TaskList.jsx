import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { isBefore, startOfDay } from "date-fns";
import TaskCard from "@/components/molecules/TaskCard";
import FilterBar from "@/components/molecules/FilterBar";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import * as taskService from "@/services/api/taskService";
import * as categoryService from "@/services/api/categoryService";

const TaskList = ({ onCreateTask, onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    search: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

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
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(task => task.categoryId === filters.category);
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      return 0;
    });

    setFilteredTasks(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      category: "",
      search: ""
    });
  };

  const handleToggleComplete = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = {
        ...task,
        status: newStatus,
        completedAt: newStatus === "completed" ? new Date().toISOString() : null
      };

      await taskService.update(taskId, updatedTask);
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      if (newStatus === "completed") {
        toast.success("Task completed! 🎉");
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const isTaskOverdue = (task) => {
    if (!task.dueDate || task.status === "completed") return false;
    return isBefore(new Date(task.dueDate), startOfDay(new Date()));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">
            {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>
        <Button onClick={onCreateTask} className="bg-gradient-to-r from-primary-600 to-secondary-600">
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="max-w-md">
          <SearchBar 
            onSearch={(value) => handleFilterChange("search", value)}
            placeholder="Search tasks..."
          />
        </div>
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          categories={categories}
        />
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
            <Empty 
              title="No tasks found"
              description={filters.search || Object.values(filters).some(f => f) 
                ? "Try adjusting your filters or search terms"
                : "Get started by creating your first task"
              }
              actionLabel="Create Task"
              onAction={onCreateTask}
            />
          ) : (
            <motion.div className="space-y-3">
              {filteredTasks.map(task => {
                const category = categories.find(c => c.Id === task.categoryId);
                return (
                  <TaskCard
                    key={task.Id}
                    task={task}
                    category={category}
                    onToggleComplete={handleToggleComplete}
                    onEdit={onEditTask}
                    onDelete={handleDeleteTask}
                    isOverdue={isTaskOverdue(task)}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;