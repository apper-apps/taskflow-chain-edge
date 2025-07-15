import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityDot from "@/components/molecules/PriorityDot";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isOverdue = false 
}) => {
  const handleToggleComplete = () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    onToggleComplete(task.Id, newStatus);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card p-4 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Checkbox
            checked={task.status === "completed"}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <PriorityDot priority={task.priority} isOverdue={isOverdue} />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(task)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ApperIcon name="Edit2" className="w-4 h-4 text-gray-500" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(task.Id)}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              {category && (
                <Badge 
                  variant="default" 
                  size="sm"
                  className="text-xs"
                  style={{ backgroundColor: category.color + "20", color: category.color }}
                >
                  {category.name}
                </Badge>
              )}
              <Badge variant={task.status} size="sm">
                {task.status.replace("-", " ")}
              </Badge>
            </div>
            
            {task.dueDate && (
              <div className={`text-xs ${isOverdue ? "text-red-600 font-medium" : "text-gray-500"}`}>
                {format(new Date(task.dueDate), "MMM d")}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;