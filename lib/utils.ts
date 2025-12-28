import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ConversationMember } from "@/@types/conversation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
}

export function formatDetailedDate(
  dateInput: string | number | Date,
  timeZone: string = "UTC"
): string {
  const date =
    typeof dateInput === "string" || typeof dateInput === "number"
      ? new Date(dateInput)
      : dateInput;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}

export function getRecipientUsername(
  members: ConversationMember[],
  userId: number
): string | null {
  return (
    members.filter((member) => member.id !== userId)[0]?.user.username || null
  );
}
