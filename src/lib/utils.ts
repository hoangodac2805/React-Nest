import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  t: number
): (...args: Parameters<F>) => void => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), t);
  };
};



export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}


export function getMediaLink(link: string) {
  return import.meta.env.VITE_API_MEDIA_URL + link
}


export function getChangeType(currentType?: "new" | "updated" | "deleted") {
  return currentType === "new" ? "new" : "updated";
}

export function moveToEnd(array:any[], index:number) {
  const item = array.splice(index, 1)[0]; // remove the item
  array.push(item);                       // add it to the end
  return array;
}