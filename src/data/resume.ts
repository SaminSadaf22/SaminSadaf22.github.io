import { projects } from "./projects";
import { skillGroups } from "./profile";
import { publications } from "./publications";
import { site } from "./site";
import { thesis } from "./thesis";

const research = projects.filter((project) => project.category === "AI Research");
const engineering = projects.filter((project) => project.category === "Software Engineering");

/**
 * Everything on the CV comes from this object. It only holds facts that are
 * already documented elsewhere on the site — no invented roles, dates or
 * metrics. When the thesis numbers are verified they belong in `thesis.ts`,
 * not here.
 */
export const resume = {
  summary:
    "AI researcher and builder working on applied deep learning, most recently computer vision for agricultural disease detection. Software engineering graduate with a focus on evaluation that can be reproduced: documented data, honest splits, and results reported as they are.",

  education: [
    {
      degree: "BSc in Software Engineering",
      institution: "Daffodil International University",
      location: "Dhaka, Bangladesh",
      period: "Graduated June 2026",
      detail:
        "Thesis: Corn Leaf Disease Detection Using Deep Learning — a controlled comparison of DenseNet121 and EfficientNet-B0.",
      href: "/education",
    },
    {
      degree: "Higher Secondary Certificate (HSC), Science Group",
      institution: "Ahammad Uddin Shah Shishu Niketan School and College",
      location: "Gaibandha, Bangladesh",
      period: "2019",
      detail: "Higher secondary education in the Science group.",
      href: "/education",
    },
    {
      degree: "Secondary School Certificate (SSC), Science Group",
      institution: "Collectorate Public School and College",
      location: "Bogura, Bangladesh",
      period: "2017",
      detail: "Secondary education in the Science group.",
      href: "/education",
    },
  ],

  research,
  engineering,
  skills: skillGroups,
  publications,
  thesisRepo: thesis.repo,
  thesisApp: thesis.app.url,
  thesisAppTitle: thesis.app.title,
  siteUrl: site.url.replace(/^https?:\/\//, ""),
  contact: {
    email: site.email,
    phone: site.phone,
    phoneHref: site.phoneHref,
    location: site.location,
    socials: site.socials,
  },

  /** Verified from the thesis premise; no accuracy figures are claimed. */
  thesisHighlights: [
    "Held the dataset, split, augmentation and training budget fixed for both backbones.",
    "Fine-tuned DenseNet121 and EfficientNet-B0 from ImageNet weights.",
    "Documented the protocol alongside the results so the comparison can be re-run.",
    "Shipped the comparison as a Gradio app on Hugging Face for disease detection and advisory.",
  ],
} as const;
