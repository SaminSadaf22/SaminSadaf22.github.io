import content from "../../content/cli.json";

export type CliInsight = {
  id: string;
  title: string;
  keywords: string[];
  body: string;
  links?: { label: string; href: string }[];
};

export const insights: CliInsight[] = content as CliInsight[];
