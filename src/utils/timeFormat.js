import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export default function timeFormat(timestamp, full = false) {
  let diff = differenceInYears(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " years ago" : "y");
  diff = differenceInMonths(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " months ago" : "mo");
  diff = differenceInWeeks(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " weeks ago" : "w");
  diff = differenceInDays(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " days ago" : "d");
  diff = differenceInHours(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " hours ago" : "h");
  diff = differenceInMinutes(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " minutes ago" : "m");
  diff = differenceInSeconds(new Date(), new Date(timestamp));
  if (diff > 0) return diff + (full ? " seconds ago" : "s");
  return "just now";
}
