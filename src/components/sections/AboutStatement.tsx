import { Fragment, type CSSProperties, type ReactNode } from "react";
import styles from "./AboutSection.module.css";

interface Range {
  start: number;
  end: number;
}

/** Case-insensitive character ranges of every highlighted phrase, merged. */
function phraseRanges(text: string, phrases: string[]): Range[] {
  const lower = text.toLowerCase();
  const found: Range[] = [];
  for (const phrase of phrases) {
    const needle = phrase.toLowerCase();
    if (!needle) continue;
    for (let at = lower.indexOf(needle); at !== -1; at = lower.indexOf(needle, at + needle.length)) {
      found.push({ start: at, end: at + needle.length });
    }
  }
  found.sort((a, b) => a.start - b.start);
  const merged: Range[] = [];
  for (const range of found) {
    const last = merged.at(-1);
    if (last && range.start <= last.end) last.end = Math.max(last.end, range.end);
    else merged.push({ ...range });
  }
  return merged;
}

const inside = (ranges: Range[], index: number) => ranges.some((r) => index >= r.start && index < r.end);

interface AboutStatementProps {
  text: string;
  /** Exact phrases in `text` set in the supporting accent. */
  emphasis?: string[];
}

/**
 * The engineering-direction statement, typeset in two tiers from the one
 * paragraph: a primary clause that runs to the end of the last highlighted
 * phrase (and its punctuation), then the supporting clause in the secondary
 * tone. The text is rendered exactly as given: every character, in order,
 * in one <p>. Words rise out of masks and the highlighted phrases light up
 * and underline (see AboutSection.module.css); nothing is ever hidden once
 * the section has been seen, and without motion it is static.
 */
export function AboutStatement({ text, emphasis = [] }: AboutStatementProps) {
  const ranges = phraseRanges(text, emphasis);
  const lastEnd = ranges.at(-1)?.end ?? 0;
  let cut = lastEnd > 0 ? lastEnd : text.length;
  if (lastEnd > 0 && /[,;:.]/.test(text[cut] ?? "")) cut += 1;

  const clauses = [{ className: styles.lead, start: 0, end: cut }];
  // The single space between the clauses is rendered once, between the spans.
  const supportStart = cut + (text.slice(cut).match(/^\s*/)?.[0].length ?? 0);
  if (supportStart < text.length) clauses.push({ className: styles.support, start: supportStart, end: text.length });

  let index = 0;
  const highlighted = (key: string, i: number, children: ReactNode) => (
    <span key={key} className={styles.hl} style={{ "--i": i } as CSSProperties}>
      {children}
    </span>
  );

  const rendered = clauses.map((clause) => {
    const slice = text.slice(clause.start, clause.end);
    const nodes: ReactNode[] = [];
    let cursor = 0;

    // Words (runs of non-space) and the spaces between them, in order.
    for (const match of slice.matchAll(/\S+|\s+/g)) {
      const token = match[0];
      const abs = clause.start + (match.index ?? cursor);
      cursor = (match.index ?? cursor) + token.length;

      if (/^\s/.test(token)) {
        // A space inside a highlighted phrase keeps the highlight continuous.
        nodes.push(inside(ranges, abs) ? highlighted(`s${abs}`, index, token) : <Fragment key={`s${abs}`}>{token}</Fragment>);
        continue;
      }

      // Split the word where a highlighted phrase starts or stops.
      const parts: ReactNode[] = [];
      for (let i = 0; i < token.length; ) {
        const on = inside(ranges, abs + i);
        let j = i + 1;
        while (j < token.length && inside(ranges, abs + j) === on) j++;
        const piece = token.slice(i, j);
        parts.push(on ? highlighted(`h${abs + i}`, index, piece) : <Fragment key={`p${abs + i}`}>{piece}</Fragment>);
        i = j;
      }

      nodes.push(
        <span key={`w${abs}`} className={styles.w}>
          <span className={styles.wi} style={{ "--i": index } as CSSProperties}>
            {parts}
          </span>
        </span>,
      );
      index += 1;
    }

    return (
      <span key={clause.start} className={clause.className}>
        {nodes}
      </span>
    );
  });

  return (
    <p data-reveal className={styles.statement} style={{ "--n": index } as CSSProperties}>
      {rendered[0]}
      {rendered[1] && (
        <>
          {" "}
          {rendered[1]}
        </>
      )}
    </p>
  );
}
