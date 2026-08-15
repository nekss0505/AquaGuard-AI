/**
 * Indian Standard Time (IST = UTC+5:30) Utility Helpers
 * Ensures all timestamps, telemetries, sensor logs, and reports across AquaGuard
 * strictly display in explicit Indian Standard Time (IST).
 */

export const IST_TIMEZONE = "Asia/Kolkata";

/**
 * Format a Date, ISO string, or timestamp into human-readable IST Date & Time
 * e.g., "14 Aug 2026, 10:24 PM IST"
 */
export function formatISTDateTime(input?: string | Date | number | null): string {
  if (!input) return "Just now (IST)";
  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(date.getTime())) return `${input} IST`;

    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formatter.format(date)} IST`;
  } catch (err) {
    return `${input} IST`;
  }
}

/**
 * Format a Date, ISO string, or timestamp into 24-hour IST time
 * e.g., "22:24 IST"
 */
export function formatISTTime24(input?: string | Date | number | null): string {
  if (!input) return "22:00 IST";
  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(date.getTime())) return `${input} IST`;

    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${formatter.format(date)} IST`;
  } catch (err) {
    return `${input} IST`;
  }
}

/**
 * Format a Date, ISO string, or timestamp into 12-hour IST time
 * e.g., "10:24 PM IST"
 */
export function formatISTTime12(input?: string | Date | number | null): string {
  if (!input) return "10:00 PM IST";
  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(date.getTime())) return `${input} IST`;

    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formatter.format(date)} IST`;
  } catch (err) {
    return `${input} IST`;
  }
}

/**
 * Format a Date, ISO string, or timestamp into IST Date
 * e.g., "14 Aug 2026"
 */
export function formatISTDate(input?: string | Date | number | null): string {
  if (!input) return "14 Aug 2026";
  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(date.getTime())) return `${input}`;

    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formatter.format(date);
  } catch (err) {
    return `${input}`;
  }
}

/**
 * Format a relative time with IST suffix
 * e.g., "10 mins ago (22:14 IST)" or "14 Aug, 09:42 IST"
 */
export function formatRelativeIST(input?: string | Date | number | null): string {
  if (!input) return "Just now (Live IST)";
  try {
    const date = typeof input === "string" || typeof input === "number" ? new Date(input) : input;
    if (isNaN(date.getTime())) {
      if (typeof input === "string" && !input.includes("IST")) {
        return `${input} (IST)`;
      }
      return `${input}`;
    }

    const timeStr = formatISTTime24(date);
    const dateStr = formatISTDate(date);
    return `${dateStr}, ${timeStr}`;
  } catch (err) {
    return `${input} (IST)`;
  }
}

/**
 * Current live timestamp in IST format: "HH:mm:ss IST"
 */
export function getCurrentISTClock(): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${formatter.format(now)} IST`;
  } catch (e) {
    return new Date().toLocaleTimeString() + " IST";
  }
}

/**
 * Hour string helper e.g. 14 -> "14:00 IST"
 */
export function formatHourIST(hour: number): string {
  const h = hour.toString().padStart(2, "0");
  return `${h}:00 IST`;
}
