import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { ReactNode } from "react";

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
  external?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

/**
 * Foundation: Link
 * A custom Next.js Link wrapper establishing baseline interaction states,
 * visible focus handling, and accessible semantics.
 */
export function Link({ children, className = "", external, href, style, ...props }: LinkProps) {
  const isExternal = external || (typeof href === "string" && href.startsWith("http"));
  
  const defaultClassName = "text-foreground hover:text-[var(--accent)] underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm";
  const combinedClassName = className || defaultClassName;

  if (isExternal) {
    return (
      <a 
        href={href.toString()} 
        className={combinedClassName} 
        style={style}
        target="_blank" 
        rel="noopener noreferrer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={combinedClassName} style={style} {...props}>
      {children}
    </NextLink>
  );
}
