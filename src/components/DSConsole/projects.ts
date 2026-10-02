
export const PROFILE = {
  name: "Kaci Ait Messaoud | Portfolio",
  tagline: "Développeur Unity & Web",
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
  image?: string; // illustration sur l'étiquette de la cartouche
};

export const PROJECTS: Project[] = [
  {
    id: "cv",
    title: "Mon CV",
    short: "CV",
    role: "Développeur Unity & Web · e-artsup Lyon",
    description: "Stage chez Mediactil (GoScreen, Fitness Express), Bachelor Jeux vidéo, BTS Communication.",
    tags: ["Unity", "C#", "Web"],
    color: "#2F2F3A",
    href: "/about",
    image: "/images/avatar.jpg",
  },
  {
    id: "casa-leone",
    title: "Casa Leone",
    short: "Casa Leone",
    role: "Jeu coopératif · Unity",
    description: "Jeu à deux sur un seul clavier, sur le thème du harcèlement, avec l'association APEL du Rhône.",
    tags: ["Unity", "C#", "WebGL"],
    color: "#B33A3A",
    href: "/work/casa-leone",
    image: "/images/projects/casa-leone/cover.png",
  },
  {
    id: "les-enquetes-toxiques",
    title: "Les Enquêtes Toxiques",
    short: "Enquêtes",
    role: "Fiction interactive · Unity",
    description: "Médecin légiste à Londris, autopsiez trois cadavres pour découvrir les causes de leur mort.",
    tags: ["Unity", "WebGL"],
    color: "#23766C",
    href: "/work/les-enquetes-toxiques",
    image: "/images/projects/les-enquetes-toxiques/cover.png",
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
    image: "/images/projects/bas-les-masques/cover.png",
  },
  // Masqués pour l'instant (PFE et Projet 4) : remets-les ici quand ils seront prêts.
];
