import type { DateRange, YearMonth } from "@/types/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-06" → "Jun 2026". */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : value;
}

/** Display parts for a month range; an open range ends in "Present". */
export function formatMonthRange(range: DateRange) {
  return {
    start: formatYearMonth(range.start),
    end: range.end ? formatYearMonth(range.end) : "Present",
  };
}
