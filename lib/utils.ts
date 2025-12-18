import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
}

export function formatDetailedDate(dateStr: string): string {
  const date = new Date(dateStr);

  // Format time (12:11 AM)
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Format date (Sep 21, 2025)
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${time} · ${formattedDate}`;
}
