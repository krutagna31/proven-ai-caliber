import { SectionContainer, ViewContainer } from "@/components/layouts";

interface PageIntroProps {
  title: string;
  description: string;
}

function PageIntro({ title, description }: PageIntroProps) {
  return (
    <SectionContainer>
      <ViewContainer className="space-y-2">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </ViewContainer>
    </SectionContainer>
  );
}

export { PageIntro }
