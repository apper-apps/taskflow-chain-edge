import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "block w-full rounded-lg border px-3 py-2 pr-10 text-sm transition-colors duration-150 focus:outline-none focus:ring-1 appearance-none bg-white",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;