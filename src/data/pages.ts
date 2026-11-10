import content from "../../content/pages.json";

export const pageCopy = content;

export const fillLocation = (text: string, location: string) =>
  text.replaceAll("{location}", location);
