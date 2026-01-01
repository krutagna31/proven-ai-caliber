interface SectionIntroProps {
  title: string;
  description: string;
}

function SectionIntro({ title, description }: SectionIntroProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-bold">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export { SectionIntro };
