import { format } from "date-fns";

export type DateFormatLabel =
  | "full"
  | "day_date_month_year"
  | "date_month_year"
  | "hour_minute"
  | "iso_plain";

const FormatPatternMap: Record<DateFormatLabel, string> = {
  iso_plain: "yyyy-MM-dd'T'HH:mm:ssxxxx",
  full: "H:mm:ss EEEE, dd MMMM, yyyy (zzzz)",
  day_date_month_year: "EEEE, dd MMMM, yyyy (zzzz)",
  date_month_year: "dd MMMM, yyyy (zzzz)",
  hour_minute: "H:mm (zzzz)",
};

export function formatDate(date: Date | undefined, pattern: DateFormatLabel) {
  return format(date || new Date(), FormatPatternMap[pattern]);
}
