export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  intro: string;
  meta?: React.ReactNode;
}) {
  return (
    <header className="mt-6 md:mt-10">
      {eyebrow}
      <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl">
        {title}
      </h1>
      <p className="mt-5 text-lg text-muted-foreground max-w-3xl">{intro}</p>
      {meta && <div className="mt-5 text-sm text-muted-foreground">{meta}</div>}
    </header>
  );
}
