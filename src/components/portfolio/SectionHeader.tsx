import { ReactNode } from "react";
import { Typography } from "@/components/ui/Typography";

interface SectionHeaderProps {
  title: string;
  description?: string;
  marker?: string; // e.g., "01", "02" for progression
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ title, description, marker, className = "", children }: SectionHeaderProps) {
  return (
    <header className={`flex flex-col items-start text-left mb-12 md:mb-16 ${className}`}>
      {marker && (
        <Typography variant="metadata" className="section-index text-accent mb-4 font-semibold tracking-widest bg-[var(--accent-dim)] px-3 py-1 rounded-full border border-[var(--border-glass)]">
          {marker}
        </Typography>
      )}
      <Typography variant="h2" as="h2" className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--foreground-secondary)] text-glow font-extrabold tracking-tight">
        {title}
      </Typography>
      {description && (
        <Typography variant="body" className="max-w-2xl">
          {description}
        </Typography>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
