export function EyebrowLabel({
  index,
  children,
}: {
  index?: string;
  children: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-paper-dim">
      {index && <span className="text-accent">{index}</span>}
      <span>{children}</span>
      <span className="h-px flex-1 max-w-16 bg-line" />
    </div>
  );
}
