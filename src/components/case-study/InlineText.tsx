import { Fragment } from "react";

/**
 * Renders `backticked` spans in case-study copy as inline code, so code
 * identifiers (function names, routes, tables) read as code. Plain strings
 * stay plain; no markdown beyond backticks.
 */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="box-decoration-clone rounded-xs bg-surface-secondary px-1 py-0.5 font-mono text-[0.875em] text-foreground"
          >
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
