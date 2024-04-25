import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface MultiInputData {
  id: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(epoch: number) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(epoch);
  return date.toLocaleDateString("en-US", options);
}

export function timeFormat(epoch: number) {
  const date = new Date(epoch);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function formatMultiInputEntry(data: MultiInputData[] | undefined) {
  if (!data) return [];

  const items: string[] = [];
  data.forEach((item) => items.push(item.id));
  return items;
}
