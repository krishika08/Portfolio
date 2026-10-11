import { Fragment, type CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  /** Offset into the stagger sequence, for text split across several elements. */
  start?: number;
}

/**
 * Wraps each word in a mask so it can rise into place (see `[data-split]`
 * and `.enter-words` in globals.css). The words keep their real spaces, so
 * wrapping, selection and screen readers behave exactly as for plain text.
 */
export function SplitText({ text, start = 0 }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${i}-${word}`}>
          <span className="word">
            <span style={{ "--i": start + i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
