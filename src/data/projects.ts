export type Project = {
  slug: string;
  title: string;
  category: "AI Research" | "Software Engineering";
  period: string;
  summary: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "corn-leaf-disease",
    title: "Corn Leaf Disease Detection Using Deep Learning",
    category: "AI Research",
    period: "Undergraduate thesis · 2026",
    summary:
      "A comparative study of DenseNet121 and EfficientNet-B0 for classifying corn leaf disease from images, developed as my thesis at Daffodil International University.",
    tags: ["DenseNet121", "EfficientNet-B0", "Transfer learning"],
    href: "/projects/corn-leaf-disease",
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
];