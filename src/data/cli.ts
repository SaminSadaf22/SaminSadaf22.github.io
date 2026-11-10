export type CliInsight = {
  id: string;
  title: string;
  /** Lower-case words that should route a query to this entry. */
  keywords: string[];
  body: string;
  links?: { label: string; href: string }[];
};

/**
 * A tiny read-only index over facts already published on the site. The
 * terminal is a keyword search, not a language model — every answer is written
 * here so nothing can be invented at runtime.
 */
export const insights: CliInsight[] = [
  {
    id: "about",
    title: "About Samin",
    keywords: ["about", "bio", "who", "introduction", "profile", "samin", "person", "yourself"],
    body: "Samin Sadaf is an AI researcher and builder based in Dhaka, Bangladesh. A software engineering graduate from Daffodil International University, working on applied deep learning — most recently computer vision for corn leaf disease detection.",
  },
  {
    id: "thesis",
    title: "The thesis",
    keywords: [
      "thesis",
      "corn",
      "leaf",
      "disease",
      "agriculture",
      "densenet",
      "densenet121",
      "efficientnet",
      "efficientnet-b0",
      "accuracy",
      "results",
      "model",
      "comparison",
      "dataset",
    ],
    body: "The thesis compares DenseNet121 and EfficientNet-B0 for classifying corn leaf disease from images, both fine-tuned from ImageNet weights. The split, augmentation and training budget were held fixed so the architecture comparison meant something. The dataset card, per-class metrics and comparison table ship with the thesis document — no accuracy quoted from memory.",
    links: [
      { label: "Read the study", href: "/projects/corn-leaf-disease" },
      { label: "Source and figures", href: "https://github.com/SaminSadaf22/diu-thesis" },
    ],
  },
  {
    id: "research",
    title: "Research direction",
    keywords: ["research", "interest", "interests", "direction", "vision", "evaluation", "transfer", "learning"],
    body: "Three threads: agricultural computer vision, evaluation under uncertainty, and efficient transfer learning. So far that is one sustained project, documented end to end rather than summarised into a headline.",
  },
  {
    id: "projects",
    title: "Projects",
    keywords: ["projects", "work", "built", "build", "booking", "django", "software", "engineering"],
    body: "Two main entries: the corn leaf disease thesis, and a Django booking management system built before the focus moved to applied machine learning. A few small side projects (Task CLI, Markdown to HTML, Image Renamer) are also listed. The thesis has a full case study; the others are listed without a public write-up.",
    links: [{ label: "All projects", href: "/projects" }],
  },
  {
    id: "skills",
    title: "Skills and stack",
    keywords: [
      "skills",
      "stack",
      "tools",
      "python",
      "typescript",
      "javascript",
      "sql",
      "astro",
      "tailwind",
      "rest",
      "git",
      "linux",
      "jupyter",
    ],
    body: "Languages: Python, TypeScript, JavaScript, SQL. Research methods: transfer learning, image classification, data preprocessing, evaluation design. Web: Astro, Django, Tailwind CSS, REST APIs. Environment: Git, Linux, Jupyter.",
    links: [{ label: "Technical profile", href: "/profile" }],
  },
  {
    id: "education",
    title: "Education",
    keywords: [
      "education",
      "degree",
      "university",
      "study",
      "studied",
      "student",
      "bsc",
      "graduate",
      "graduation",
      "diu",
      "ssc",
      "hsc",
      "school",
      "college",
      "bogura",
      "gaibandha",
    ],
    body: "BSc in Software Engineering at Daffodil International University, Dhaka — graduated June 2026. Thesis: Corn Leaf Disease Detection Using Deep Learning. Earlier: HSC (Science) at Ahammad Uddin Shah Shishu Niketan School and College, Gaibandha (2019), and SSC (Science) at Collectorate Public School and College, Bogura (2017).",
    links: [{ label: "Education page", href: "/education" }],
  },
  {
    id: "contact",
    title: "Contact",
    keywords: ["contact", "email", "mail", "phone", "reach", "message", "github", "hugging", "huggingface", "social"],
    body: "Email: md.saminsadaf@gmail.com · Phone: 01847309297 · GitHub: SaminSadaf22. Email is the most direct route; replies go to anything specific about the work.",
    links: [
      { label: "Email Samin", href: "mailto:md.saminsadaf@gmail.com" },
      { label: "GitHub", href: "https://github.com/SaminSadaf22" },
    ],
  },
  {
    id: "cv",
    title: "CV and resume",
    keywords: ["cv", "resume", "résumé", "pdf", "print", "download", "document"],
    body: "There is a print-tuned CV at /cv, laid out for A4 and Save as PDF. The homepage resume section carries the same record without leaving the page.",
    links: [{ label: "Open the CV", href: "/cv" }],
  },
  {
    id: "publications",
    title: "Publications",
    keywords: ["publications", "papers", "paper", "published", "journal", "preprint", "article"],
    body: "None yet. The publications section stays empty until a paper exists and can be verified — no aspirational entries.",
    links: [{ label: "Publications", href: "/publications" }],
  },
  {
    id: "availability",
    title: "Availability",
    keywords: ["available", "availability", "hire", "hiring", "job", "collaboration", "collaborate", "opportunity", "open", "work with"],
    body: "Open to research collaboration and conversations about applied deep learning, especially computer vision and evaluation. The fastest route is email.",
  },
  {
    id: "location",
    title: "Location",
    keywords: ["location", "where", "based", "city", "dhaka", "bangladesh", "timezone", "time"],
    body: "Dhaka, Bangladesh — UTC+6. Happy to work with people in other time zones; email is asynchronous by default.",
  },
  {
    id: "fun",
    title: "Something lighter",
    keywords: ["fun", "joke", "jokes", "coffee", "meme", "lighter", "easter", "egg", "secret"],
    body: "Two models walk into a bar. One is denser, the other more efficient. The bartender asks for the test split — and that is where the story gets honest.",
  },
];
