export interface Stat {
  text: string;
  source: string;
  url?: string;
}

export function KeyStatistics({
  topic,
  stats,
}: {
  topic: string;
  stats: Stat[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold">Key {topic} Statistics</h2>
      <ul className="mt-4 space-y-3">
        {stats.map((s) => (
          <li
            key={s.text}
            className="rounded-xl border border-border bg-card p-4 text-foreground/85"
          >
            <p>
              <span className="font-medium">According to </span>
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {s.source}
                </a>
              ) : (
                <span className="font-medium">{s.source}</span>
              )}
              , {s.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
