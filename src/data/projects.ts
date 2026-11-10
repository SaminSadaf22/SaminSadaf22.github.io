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
    slug: "digital-service-booking-system",
    title: "Digital Service Booking System",
    category: "Software Engineering",
    period: "Software engineering project",
    summary:
      "A Django application for managing service bookings, built before my focus moved to applied machine learning.",
    tags: ["Django", "Python", "Relational database"],
  },
];
