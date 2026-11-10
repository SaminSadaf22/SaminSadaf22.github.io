import content from "../../content/profile.json";

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ResearchInterest = {
  title: string;
  detail: string;
};

export const skillGroups: SkillGroup[] = content.skillGroups;
export const researchInterests: ResearchInterest[] = content.researchInterests;
