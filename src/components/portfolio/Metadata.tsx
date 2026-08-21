import { Typography } from "@/components/ui/Typography";
import { ReactNode } from "react";

interface MetadataProps {
  label?: string;
  value: ReactNode;
  className?: string;
}

export function Metadata({ label, value, className = "" }: MetadataProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <Typography variant="metadata" className="text-foreground-muted">
          {label}:
        </Typography>
      )}
      <Typography variant="metadata" className="text-foreground-secondary font-medium">
        {value}
      </Typography>
    </div>
  );
}

interface MetadataGroupProps {
  items: { label?: string; value: ReactNode }[];
  className?: string;
}

export function MetadataGroup({ items, className = "" }: MetadataGroupProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {items.map((item, index) => (
        <Metadata key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
}
