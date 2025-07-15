import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className, 
  error,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <textarea
      rows={rows}
      className={cn(
        "block w-full rounded-lg border px-3 py-2 text-sm placeholder-gray-500 transition-colors duration-150 focus:outline-none focus:ring-1 resize-vertical",
        error 
          ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;