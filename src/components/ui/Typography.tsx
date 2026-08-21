import { ReactNode } from "react";

type TypographyVariant = "display" | "h1" | "h2" | "h3" | "body" | "body-small" | "metadata" | "label";

interface TypographyProps {
  variant?: TypographyVariant;
  as?: React.ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Typography({
  variant = "body",
  as,
  id,
  className = "",
  children,
}: TypographyProps) {
  const styles: Record<TypographyVariant, string> = {
    display: "font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight",
    h1: "font-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight",
    h2: "font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight",
    h3: "font-display text-xl md:text-2xl font-medium text-foreground",
    body: "font-sans text-base md:text-lg text-foreground-secondary leading-relaxed",
    "body-small": "font-sans text-sm text-foreground-muted leading-relaxed",
    metadata: "font-mono text-xs md:text-sm text-foreground-muted tracking-tight",
    label: "font-sans text-sm font-medium text-foreground tracking-wide uppercase",
  };

  const defaultElement: Record<TypographyVariant, React.ElementType> = {
    display: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    body: "p",
    "body-small": "p",
    metadata: "span",
    label: "label",
  };

  const Component = as || defaultElement[variant];

  return (
    <Component id={id} className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
}
