import content from "../../content/resume.json";
import { projects } from "./projects";
import { skillGroups } from "./profile";
import { publications } from "./publications";
import { site } from "./site";
import { thesis } from "./thesis";

const research = projects.filter((project) => project.category === "AI Research");
const engineering = projects.filter((project) => project.category === "Software Engineering");

export const resume = {
  summary: content.summary,
  education: content.education,
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
  thesisHighlights: content.thesisHighlights,
};
