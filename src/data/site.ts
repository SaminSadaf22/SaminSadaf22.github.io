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
