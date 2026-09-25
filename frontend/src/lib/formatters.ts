const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

function getBrowserLocale(): string {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE;
  }

  return navigator.language || DEFAULT_LOCALE;
}

function toDate(value: string | Date): Date | null {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  showSign?: boolean;
}

export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {},
): string {
  const {
    currency = DEFAULT_CURRENCY,
    locale = getBrowserLocale(),
    showSign = false,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: showSign ? "exceptZero" : "auto",
  }).format(amount);
}

export interface DateFormatOptions {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  fallback?: string;
}

export function formatDate(
  value: string | Date,
  config: DateFormatOptions = {},
): string {
  const {
    locale = getBrowserLocale(),
    options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    },
    fallback = "—",
  } = config;
  const date = toDate(value);

  if (!date) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDateTime(
  value: string | Date,
  locale = getBrowserLocale(),
): string {
  return formatDate(value, {
    locale,
    options: {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  });
}

const RELATIVE_TIME_DIVISIONS = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
] as const satisfies ReadonlyArray<{
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}>;

export function formatRelativeTime(
  value: string | Date,
  locale = getBrowserLocale(),
  now: Date = new Date(),
): string {
  const date = toDate(value);

  if (!date) {
    return "—";
  }

  let duration = (date.getTime() - now.getTime()) / 1_000;

  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
        Math.round(duration),
        division.unit,
      );
    }

    duration /= division.amount;
  }

  return formatDate(date, { locale });
}

export function toLocalDateInputValue(value: string | Date): string {
  const date = toDate(value);

  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
