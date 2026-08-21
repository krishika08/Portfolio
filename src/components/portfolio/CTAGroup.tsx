import { ReactNode } from "react";

interface CTAGroupProps {
  children: ReactNode;
  className?: string;
  alignment?: "left" | "center" | "right";
}

export function CTAGroup({ children, className = "", alignment = "left" }: CTAGroupProps) {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 mt-8 ${alignmentClasses[alignment]} ${className}`}>
      {children}
    </div>
  );
}
