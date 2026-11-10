import content from "../../content/projects.json";

export type Project = {
  slug: string;
  title: string;
  category: "AI Research" | "Software Engineering" | "Side Project";
  period: string;
  summary: string;
  tags: string[];
  href?: string;
  repo?: string;
  linkLabel?: string;
};

export const projects: Project[] = content as Project[];
