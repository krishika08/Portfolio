import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

/**
 * Foundation: Section
 * A semantic HTML <section> primitive with consistent vertical spacing.
 */
export function Section({ children, className = "", id, "aria-labelledby": ariaLabelledBy }: SectionProps) {
  return (
    <section 
      id={id} 
      aria-labelledby={ariaLabelledBy} 
      className={`py-12 md:py-16 lg:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
