
export const PROFILE = {
  name: "Kaci Ait Messaoud | Portfolio",
  tagline: "Développeur jeux vidéo",
};

export type Project = {
  id: string;
  title: string;
  short: string; 
  role: string; 
  description: string;
  tags: string[];
  color: string; 
  href?: string; 
};

export const PROJECTS: Project[] = [
  {
    id: "cv",
    title: "Mon CV",
    short: "CV",
    role: "Parcours et compétences",
    description: "Formation, expériences, compétences et contact.",
    tags: ["Unity", "C#", "Shaders", "VFX"],
    color: "#2F2F3A",
    href: "/about", // ou "/cv.pdf" si tu déposes ton CV en PDF dans public/
  },
  {
    id: "pfe",
    title: "Projet de fin d'études",
    short: "PFE",
    role: "Jeu vidéo sous Unity",
    description:
      "Décris ici le concept du jeu, ton rôle dans l'équipe et ce dont tu es le plus fier.",
    tags: ["Unity", "C#"],
    color: "#B93A62",
    href: "/work/pfe", // page du projet (ou un lien externe itch.io)
  },
  {
    id: "p2",
    title: "Projet 2",
    short: "Projet 2",
    role: "À remplacer",
    description: "Un shader, un prototype, un jeu de game jam : à toi de choisir.",
    tags: ["Shaders"],
    color: "#23766C",
    href: "/work/projet-2", // page du projet (ou un lien externe itch.io)
  },
  {
    id: "p3",
    title: "Projet 3",
    short: "Projet 3",
    role: "À remplacer",
    description: "Une scène 3D, un outil, un effet que tu veux montrer.",
    tags: ["3D"],
    color: "#8F5E0E",
    href: "/work/projet-3", // page du projet (ou un lien externe itch.io)
  },
  {
    id: "p4",
    title: "Projet 4",
    short: "Projet 4",
    role: "À remplacer",
    description: "Des VFX, une démo technique, un autre jeu.",
    tags: ["VFX"],
    color: "#4A5FBF",
    href: "/work/projet-4", // page du projet (ou un lien externe itch.io)
  },
];
