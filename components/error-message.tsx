import { cn } from "@/lib";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps extends React.ComponentProps<"div"> {
  error: Error | null;
}

function ErrorMessage({ error, className, ...props }: ErrorMessageProps) {
  return (
    <div className={cn("flex gap-2 text-red-500", className)} {...props}>
      <AlertCircle size={18} />
      <span className="text-sm font-medium">{error?.message}</span>
    </div>
  );
}

export { ErrorMessage };