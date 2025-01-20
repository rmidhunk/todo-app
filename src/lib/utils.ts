import { clsx, type ClassValue } from "clsx";
import { SetURLSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateParams = (
  newParams: object,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
) => {
  const updatedParams = new URLSearchParams(searchParams);
  Object.entries(newParams).forEach(([key, value]) => {
    if (value) {
      updatedParams.set(key, value.toString());
    } else {
      updatedParams.delete(key);
    }
  });
  setSearchParams(updatedParams);
};
