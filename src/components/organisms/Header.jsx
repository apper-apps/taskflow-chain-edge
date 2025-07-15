import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  onCreateTask, 
  onSearch, 
  onToggleSidebar,
  taskCounts = {}
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <ApperIcon name="Menu" className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden sm:block flex-1 max-w-md">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Quick stats */}
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-600 mr-4">
            <div className="flex items-center gap-1">
              <ApperIcon name="CheckSquare" className="w-4 h-4" />
              <span>{taskCounts.total || 0} tasks</span>
            </div>
            {taskCounts.overdue > 0 && (
              <div className="flex items-center gap-1 text-red-600">
                <ApperIcon name="AlertCircle" className="w-4 h-4" />
                <span>{taskCounts.overdue} overdue</span>
              </div>
            )}
          </div>

          <Button 
            onClick={onCreateTask}
            className="bg-gradient-to-r from-primary-600 to-secondary-600"
          >
            <ApperIcon name="Plus" className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden mt-4">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;