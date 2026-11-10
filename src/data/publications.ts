import content from "../../content/publications.json";

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  href?: string;
};

export const publications: Publication[] = content as Publication[];
