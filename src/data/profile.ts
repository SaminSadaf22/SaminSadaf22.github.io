// Single source of truth for capability and interest copy, shared by the
// technical profile, the research page and the printable CV.

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  {
    title: "Research methods",
    items: ["Transfer learning", "Image classification", "Data preprocessing", "Evaluation design"],
  },
  { title: "Web engineering", items: ["Astro", "Django", "Tailwind CSS", "REST APIs"] },
  { title: "Environment", items: ["Git", "Linux", "Jupyter"] },
];

export type ResearchInterest = {
  title: string;
  detail: string;
};

export const researchInterests: ResearchInterest[] = [
  {
    title: "Agricultural computer vision",
    detail:
      "Disease detection from leaf imagery, where lighting, background and class imbalance are the real difficulty.",
  },
  {
    title: "Evaluation under uncertainty",
    detail:
      "Per-class reporting, calibration and split hygiene — what decides whether an accuracy figure means anything.",
  },
  {
    title: "Efficient transfer learning",
    detail:
      "What a pretrained backbone buys when compute and labelled data are both limited.",
  },
];
