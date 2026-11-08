export const site = {
  name: "Samin Sadaf",
  role: "AI Researcher & Builder",
  title: "Samin Sadaf | AI Researcher & Builder",
  description:
    "Samin Sadaf is an AI researcher and builder working on deep learning for agricultural disease detection, and a software engineering graduate from Daffodil International University.",
  url: "https://saminsadaf22.github.io",
  location: "Dhaka, Bangladesh",
  // TODO: replace with the address you actually want public.
  email: "hello@saminsadaf.me",
  socials: [
    { label: "GitHub", href: "https://github.com/SaminSadaf22" },
    // TODO: confirm this is your Hugging Face namespace.
    { label: "Hugging Face", href: "https://huggingface.co/SAMINSADAF" },
    // TODO: add LinkedIn when you have the URL — do not guess it.
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Profile", href: "/profile" },
  { label: "Education", href: "/education" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
] as const;