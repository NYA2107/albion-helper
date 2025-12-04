import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import getFormattedTime from "./getFormattedTime";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { getFormattedTime };
