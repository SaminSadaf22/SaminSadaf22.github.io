import content from "../../content/site.json";

export type SocialLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const site = content.site;
export const nav = content.nav as NavItem[];
export const footerNav = content.footerNav as NavItem[];

const nameParts = site.name.trim().split(/\s+/).filter(Boolean);
export const firstName = nameParts[0] ?? site.name;
export const lastName = nameParts.slice(1).join(" ");
export const initials =
  nameParts
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase() || "•";
