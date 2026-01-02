import { Spinner } from "@/components/ui";

function LoadingMessage() {
  return (
    <div className="text-muted-foreground flex gap-2">
      <Spinner />
      <span className="text-sm">Loading...</span>
    </div>
  );
}

export { LoadingMessage };