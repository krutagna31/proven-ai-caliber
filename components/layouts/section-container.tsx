import { cn } from "@/lib";

function SectionContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-6", className)} {...props}>
      {children}
    </section>
  );
}

export { SectionContainer };
