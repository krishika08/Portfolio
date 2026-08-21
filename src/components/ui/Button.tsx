import { ReactNode } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type ButtonVariant = "primary" | "secondary" | "text" | "glass";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
}

interface ButtonAsButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps, Omit<NextLinkProps, 'href'> {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;

  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070F] disabled:opacity-40 disabled:pointer-events-none rounded-full text-sm";
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-accent text-white hover:bg-accent-hover px-6 py-2.5 shadow-[0_0_24px_var(--accent-glow)] hover:shadow-[0_0_32px_var(--accent-glow)] font-semibold",
    secondary: "bg-accent-dim text-foreground border border-border-glass hover:bg-accent-dim hover:border-accent backdrop-blur-sm px-6 py-2.5",
    glass: "bg-glass-bg text-foreground border border-glass-border hover:bg-glass-bg-hover hover:border-glass-border-hover backdrop-blur-md px-6 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    text: "text-foreground-secondary hover:text-accent underline-offset-4 hover:underline px-2 py-1.5",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...linkProps } = props as ButtonAsLinkProps;
    const isExternal = external || (typeof href === "string" && href.startsWith("http"));
    
    if (isExternal) {
      return (
        <a href={href.toString()} className={combinedClassName} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <NextLink href={href} className={combinedClassName} {...linkProps}>
        {children}
      </NextLink>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
