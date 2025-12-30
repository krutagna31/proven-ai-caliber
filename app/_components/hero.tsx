import Link from "next/link";
import { SectionContainer, ViewContainer } from "@/components/layouts";
import { Button } from "@/components/ui";

function Hero() {
  return (
    <SectionContainer>
      <ViewContainer className="max-w-3xl">
        <div className="space-y-6">
          <h1 className="text-center text-4xl font-bold">
            Transforming Pharmaceutical Operations with Intelligent Workflow
            Management
          </h1>
          <p className="text-muted-foreground text-center">
            Proven AI streamlines the management of pharmaceutical tasks, master
            data, and document workflows—empowering your team to operate more
            efficiently, reduce errors, and accelerate decision-making.
          </p>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </ViewContainer>
    </SectionContainer>
  );
}

export { Hero };