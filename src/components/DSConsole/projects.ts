
export const PROFILE = {
  name: "Kaci Ait Messaoud | Portfolio",
  tagline: "Étudiant en Game Design",
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
    role: "Bachelor Game Design · e-artsup Lyon",
    description: "Stage web chez Mediactil, BTS Communication, 3D et illustration.",
    tags: ["Unity", "Unreal", "Blender", "Web"],
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
    id: "les-enquetes-toxiques",
    title: "Les Enquêtes Toxiques",
    short: "Enquêtes",
    role: "Fiction interactive · Unity",
    description: "Jouable dans le navigateur. [À REMPLIR : le concept en une phrase.]",
    tags: ["Unity", "WebGL"],
    color: "#23766C",
    href: "/work/les-enquetes-toxiques",
  },
  {
    id: "bas-les-masques",
    title: "Bas les masques",
    short: "Masques",
    role: "Jeu Unity",
    description: "Jouable dans le navigateur. [À REMPLIR : le concept en une phrase.]",
    tags: ["Unity", "WebGL"],
    color: "#8F5E0E",
    href: "/work/bas-les-masques",
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
