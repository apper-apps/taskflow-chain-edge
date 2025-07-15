import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const Sidebar = ({ categories = [], selectedCategory, onCategorySelect, taskCounts = {} }) => {
  const menuItems = [
    { id: "all", label: "All Tasks", icon: "List", count: taskCounts.all || 0 },
    { id: "today", label: "Today", icon: "Calendar", count: taskCounts.today || 0 },
    { id: "overdue", label: "Overdue", icon: "AlertCircle", count: taskCounts.overdue || 0 },
    { id: "completed", label: "Completed", icon: "CheckCircle", count: taskCounts.completed || 0 }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-1">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Overview
          </h2>
          {menuItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => onCategorySelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === item.id
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <ApperIcon 
                  name={item.icon} 
                  className={`w-4 h-4 ${
                    selectedCategory === item.id ? "text-primary-600" : "text-gray-500"
                  }`} 
                />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <Badge 
                  size="sm" 
                  variant={selectedCategory === item.id ? "primary" : "default"}
                >
                  {item.count}
                </Badge>
              )}
            </motion.button>
          ))}
        </div>

        {categories.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Categories
            </h2>
            {categories.map(category => (
              <motion.button
                key={category.Id}
                whileHover={{ x: 4 }}
                onClick={() => onCategorySelect(`category-${category.Id}`)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === `category-${category.Id}`
                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                {category.taskCount > 0 && (
                  <Badge 
                    size="sm" 
                    variant={selectedCategory === `category-${category.Id}` ? "primary" : "default"}
                  >
                    {category.taskCount}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          TaskFlow v1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;