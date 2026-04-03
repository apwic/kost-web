interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <span
        className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
          dark
            ? "bg-white/10 text-fg-inverse"
            : "bg-accent-primary/10 text-accent-primary"
        }`}
      >
        {tag}
      </span>
      <h2
        className={`font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4 ${
          dark ? "text-fg-inverse" : "text-fg-primary"
        }`}
      >
        {title}
      </h2>
      <p
        className={`font-[family-name:var(--font-body)] text-lg max-w-2xl mx-auto ${
          dark ? "text-fg-inverse/70" : "text-fg-secondary"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}
