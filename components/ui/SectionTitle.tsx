interface SectionTitleProps {
  full: string;
  highlight: string;
}

/** Section heading with a gradient-underlined highlight word.
 *  Usage: <SectionTitle full="My highlighted title" highlight="highlighted" />
 */
export default function SectionTitle({ full, highlight }: SectionTitleProps) {
  const idx = full.indexOf(highlight);
  const before = full.slice(0, idx);
  const after = full.slice(idx + highlight.length);

  return (
    <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
      {before}
      <span className="relative inline-block">
        <span className="gradient-text">{highlight}</span>
        <span className="about-title-underline absolute -bottom-1 left-0 h-0.75 w-full rounded-full" />
      </span>
      {after}
    </h2>
  );
}
