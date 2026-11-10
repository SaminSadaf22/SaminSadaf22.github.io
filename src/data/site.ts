export const site = {
  name: "Samin Sadaf",
  role: "AI Researcher & Builder",
  title: "Samin Sadaf | AI Researcher & Builder",
  description:
    "Samin Sadaf is an AI researcher and builder working on deep learning for agricultural disease detection, and a software engineering graduate from Daffodil International University.",
  url: "https://saminsadaf.me",
  location: "Dhaka, Bangladesh",
  email: "md.saminsadaf@gmail.com",
  // Shown as written locally; the tel: link needs the country code.
  phone: "01847309297",
  phoneHref: "+8801847309297",
  socials: [
    { label: "GitHub", href: "https://github.com/SaminSadaf22" },
    // TODO: confirm this is your Hugging Face namespace.
    { label: "Hugging Face", href: "https://huggingface.co/SAMINSADAF" },
    // TODO: add LinkedIn when you have the URL — do not guess it.
  ],
} as const;

// The primary nav is a scroll map for the single-page home. Deep pages still
// exist for the case study, printable CV and archives, and are linked in the
// footer.
export const nav = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume", href: "/#resume" },
  { label: "Terminal", href: "/#terminal" },
  { label: "Contact", href: "/#contact" },
] as const;

export const footerNav = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume", href: "/#resume" },
  { label: "Terminal", href: "/#terminal" },
  { label: "Publications", href: "/publications" },
  { label: "Technical profile", href: "/profile" },
  { label: "Education", href: "/education" },
  { label: "CV", href: "/cv" },
] as const;
