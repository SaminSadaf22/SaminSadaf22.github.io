export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  href?: string;
};

// Intentionally empty. Entries are added only when a paper exists and is
// verifiable — never as placeholders to make the page look fuller.
export const publications: Publication[] = [];