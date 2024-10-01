import { differenceInMonths, format } from "date-fns";

export const dateDifference = (date: string): string => {
  if (!date) return "N/A";
  try {
    new Date(date);
  } catch (e) {
    console.log(e);
    return "N/A";
  }
  const dayDate = +format(date, "d");
  const currentDay = +format(new Date(), "d");
  const formattedDate = [];
  const monthsSince = differenceInMonths(new Date(), date);
  const yearsSince = Math.floor(monthsSince / 12);
  const remainderMonths = monthsSince - yearsSince * 12;
  const remainderDays = currentDay - dayDate - 1;
  console.log(remainderDays, dayDate);
  if (yearsSince > 0) formattedDate.push(`${yearsSince}y`);
  if (remainderMonths > 0) formattedDate.push(`${remainderMonths}m`);
  if (remainderDays > 0) formattedDate.push(`${remainderDays}d`);
  return formattedDate.join(" - ");
};

export const formatDate = (date: string): string => {
  if (!date) return "N/A";
  try {
    new Date(date);
  } catch (e) {
    console.log(e);
    return "N/A";
  }

  console.log(date);

  return format(date, "MMM d, u");
};
