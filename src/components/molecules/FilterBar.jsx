import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  categories = []
}) => {
  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { value: "", label: "All Priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map(cat => ({ value: cat.Id, label: cat.name }))
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex flex-wrap gap-3 flex-1">
        <div className="min-w-[120px]">
          <Select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="min-w-[120px]">
          <Select
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        
        <div className="min-w-[140px]">
          <Select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="flex items-center gap-2"
        >
          <ApperIcon name="X" className="w-4 h-4" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterBar;