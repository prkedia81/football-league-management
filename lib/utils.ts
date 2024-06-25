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

export function formatNonDateString(dateString: string): Date {
  // Split the string into [day, month, year]
  const parts = dateString.split(".");

  // Convert the day and month to integers
  const day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10);
  const year = parseInt(parts[2]);

  // Adjust the month to be zero-indexed
  month -= 1;

  // Create the Date object
  const date = new Date(year, month, day);
  return date;
}

export function isValidDateFormat(dateString: string) {
  return !isNaN(Date.parse(dateString));
}

export function canParseToInt(value: string) {
  try {
    // Attempt to parse the value into an integer
    const intValue = parseInt(value);

    // Check if the parsed value is NaN
    return !isNaN(intValue);
  } catch (error) {
    // If an error occurs during parsing, return false
    return false;
  }
}

export function formatMultiInputEntry(data: MultiInputData[] | undefined) {
  if (!data) return [];

  const items: string[] = [];
  data.forEach((item) => items.push(item.id));
  return items;
}
