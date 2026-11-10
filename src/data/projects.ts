export type Project = {
  slug: string;
  title: string;
  category: "AI Research" | "Software Engineering" | "Side Project";
  period: string;
  summary: string;
  tags: string[];
  href?: string;
  repo?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "corn-leaf-disease",
    title: "Corn Leaf Disease Detection Using Deep Learning",
    category: "AI Research",
    period: "Undergraduate thesis · 2026",
    summary:
      "A comparative study of DenseNet121 and EfficientNet-B0 for classifying corn leaf disease from images, developed as my thesis at Daffodil International University. Includes a deployed Gradio app on Hugging Face for disease detection and advisory.",
    tags: ["DenseNet121", "EfficientNet-B0", "Transfer learning", "Gradio", "Hugging Face"],
    href: "/projects/corn-leaf-disease",
    linkLabel: "Read the study",
  },
  {
    slug: "cognitive-ai",
    title: "Cognitive AI: A Global-Workspace Hypothesis",
    category: "AI Research",
    period: "2026 · independent hypothesis",
    summary:
      "A small, inspectable cognitive loop that combines predictive processing, a two-channel global workspace, decaying memory, affect and action selection. Its “I feel” line is a generated self-report, not a claim of sentience.",
    tags: ["Global workspace", "Predictive processing", "Affect", "TypeScript"],
    href: "/projects/cognitive-ai",
    repo: "https://github.com/SaminSadaf22/cognitive-ai",
    linkLabel: "Open hypothesis",
  },
  {
    slug: "booking-system",
    title: "Booking Management System",
    category: "Software Engineering",
    period: "Previous software engineering project",
    summary:
      "A Django application for managing bookings, built before my focus moved to applied machine learning.",
    tags: ["Django", "Python", "Relational database"],
  },
  {
    slug: "task-cli",
    title: "Task CLI",
    category: "Side Project",
    period: "2023 · side project",
    summary:
      "A tiny command-line to-do list in Python with add, list, done and clear commands. Tasks are stored in a local JSON file, with no database or external service.",
    tags: ["Python", "CLI", "JSON"],
    href: "https://github.com/SaminSadaf22/task-cli",
  },
  {
    slug: "md-to-html",
    title: "Markdown to HTML",
    category: "Side Project",
    period: "2022 · side project",
    summary:
      "A dependency-free Markdown to HTML converter in Python. Handles headings, bold and italic text, inline code, unordered lists and paragraphs.",
    tags: ["Python", "Text parsing", "CLI"],
    href: "https://github.com/SaminSadaf22/md-to-html",
  },
  {
    slug: "image-renamer",
    title: "Image Renamer",
    category: "Side Project",
    period: "2024 · side project",
    summary:
      "A small Python utility for batch-renaming image files with a consistent prefix and numbering. Includes a dry-run mode to preview changes before applying them.",
    tags: ["Python", "Files", "CLI"],
    href: "https://github.com/SaminSadaf22/image-renamer",
  },
];