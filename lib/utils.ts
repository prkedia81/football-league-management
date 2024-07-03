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
  // To GMT
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
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

export function getTimeFormat(timeString: string) {
  // Check for AM/PM indicator
  const amPmIndicator = timeString.includes("AM") || timeString.includes("PM");

  // let data = timeString.match(/\d{1,2}:\d{2}/)?.slice(0, 2);
  const regex = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
  const match = timeString.match(regex);

  // Parse the time string into hours and minutes
  if (match) {
    let [_, hours, minute, period] = match;
    // Convert to 24-hour format for comparison
    const standardHour = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;

    // Check if the parsed hour falls within the expected ranges for 12-hour or 24-hour format
    if (standardHour >= 1 && standardHour <= 12 && amPmIndicator) {
      return "12-hour";
    } else if (standardHour >= 0 && standardHour < 23 && !amPmIndicator) {
      return "24-hour";
    }
  }

  return "Unknown";
}

export function convertTo24HourFormat(timeString: string) {
  // Regular expression to match the time string format HH:MM AM/PM
  const regex = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;

  // Match the input time string against the regular expression
  const match = timeString.match(regex);

  if (match) {
    let [_, hour, minute, period] = match;
    let newHour = parseInt(hour);

    // Adjust the hour for PM times
    if (period.toUpperCase() === "PM" && newHour !== 12) {
      newHour += 12;
    }

    // Return the time in 24-hour format
    return `${newHour}:${minute.padStart(2, "0")}`;
  } else {
    throw new Error("Invalid time format");
  }
}

export function convertToTitleCase(str: string) {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => {
      // Capitalize the first letter and make the rest lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" "); // Join all the words back together with spaces
}

export function formatMultiInputEntry(data: MultiInputData[] | undefined) {
  if (!data) return [];

  const items: string[] = [];
  data.forEach((item) => items.push(item.id));
  return items;
}
