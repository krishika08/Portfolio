import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Foundation: Container
 * Fluid, max-width bounded container ensuring horizontal overflow protection
 * and responsive padding across 375px to 1920px+.
 */
export function Container({ children, className = "", as: Component = "div" }: ContainerProps) {
  return (
    <Component className={`w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Component>
  );
}
