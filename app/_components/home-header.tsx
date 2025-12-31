import Link from "next/link";
import { ViewContainer } from "@/components/layouts";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui";

function HomeHeader() {
  return (
    <header className="py-3">
      <ViewContainer className="flex max-w-7xl items-center justify-between">
        <Link href="/">Proven AI</Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="secondary" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </ViewContainer>
    </header>
  );
}

export { HomeHeader };
