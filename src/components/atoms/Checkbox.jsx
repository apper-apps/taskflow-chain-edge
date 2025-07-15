import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked,
  onChange,
  disabled,
  ...props 
}, ref) => {
  return (
    <motion.div 
      className="relative inline-flex items-center"
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
        className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200",
          checked 
            ? "bg-primary-600 border-primary-600" 
            : "bg-white border-gray-300 hover:border-primary-400",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;