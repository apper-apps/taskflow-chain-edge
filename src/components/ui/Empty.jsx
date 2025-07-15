import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Get started by creating your first task",
  actionLabel = "Create Task",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-200 rounded-full flex items-center justify-center">
          <ApperIcon name="CheckSquare" className="w-10 h-10 text-primary-600" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="btn btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;