import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const TextArea = forwardRef(({ 
  className, 
  error = false,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-base ring-offset-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-300",
        error && "border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;