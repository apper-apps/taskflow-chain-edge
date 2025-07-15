import { cn } from "@/utils/cn";

const PriorityDot = ({ priority, className, isOverdue = false }) => {
  const priorityStyles = {
    low: "bg-green-500",
    medium: "bg-accent-500", 
    high: "bg-red-500"
  };

  return (
    <div 
      className={cn(
        "w-3 h-3 rounded-full flex-shrink-0",
        priorityStyles[priority],
        isOverdue && priority === "high" && "animate-pulse",
        className
      )}
    />
  );
};

export default PriorityDot;