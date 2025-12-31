import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const viewContainerVariants = cva("mx-auto px-4", {
  variants: {
    size: {
      default: "max-w-7xl",
      sm: "max-w-3xl",
      md: "max-w-5xl",
      full: "w-full",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

function ViewContainer({
  children,
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof viewContainerVariants>) {
  return (
    <div className={cn(viewContainerVariants({ size, className }))} {...props}>
      {children}
    </div>
  );
}

export { ViewContainer };