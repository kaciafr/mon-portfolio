import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

// Tout ce qui est marqué [À REMPLIR] attend tes vraies infos.

const person: Person = {
  firstName: "Kaci",
  lastName: "Ait Messaoud",
  name: `Kaci Ait Messaoud`,
  role: "Étudiant en Game Design",
  avatar: "/images/avatar.jpg", // [À REMPLIR] remplace l'image par ta photo
  email: "kaciait581@gmail.com",
  location: "Europe/Paris", // fuseau horaire IANA
  city: "Lyon, France", // affiché sur la page À propos
  languages: ["Français", "Anglais", "Italien"],
  locale: "fr",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Newsletter</>,
  description: <></>,
};

const social: Social = [
  // Les liens "essential: true" s'affichent aussi sur la page À propos.
  // Décommente et complète quand tu as les liens :
  // { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/...", essential: true },
  // { name: "itch.io", icon: "itchio", link: "https://....itch.io", essential: true },
  // { name: "GitHub", icon: "github", link: "https://github.com/kaciafr", essential: true },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `${person.name} – Portfolio`,
  description: `Portfolio de ${person.name}, ${person.role.toLowerCase()}`,
  headline: <>Game Design · 3D · Illustration · Web</>,
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: (
    <>
      En 3e année de Bachelor à e-artsup Lyon. Je recherche un stage ou un job étudiant de mai à
      juin et d&apos;août à septembre.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `${person.name}, ${person.role.toLowerCase()}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Présentation",
    description: (
      <>
        Étudiant en 3e année de Bachelor Game Design à e-artsup Lyon, je viens de la communication
        (BTS) et du graphisme. J&apos;aime relier le dessin, la 3D et le jeu : de l&apos;illustration
        au prototype jouable sous Unity ou Unreal Engine. En parallèle de mes études, j&apos;ai
        travaillé en développement web, en UX et en création de contenus pour des entreprises.
      </>
    ),
  },
  work: {
    display: true,
    title: "Expériences",
    experiences: [
      {
        company: "Mediactil",
        timeframe: "2023 · Stage de 3 mois",
        role: "Développeur web & UX designer",
        achievements: [
          <>Développement web en HTML et CSS.</>,
          <>Conception graphique et ergonomie des interfaces.</>,
          <>Transformation créative de kiosques de vente.</>,
        ],
        images: [],
      },
      {
        company: "Fitness Express",
        timeframe: "[À REMPLIR : dates]",
        role: "Développeur web",
        achievements: [<>[À REMPLIR : ce que tu as fait pour Fitness Express.]</>],
        images: [],
      },
      {
        company: "Emoli",
        timeframe: "Mai – juillet 2023",
        role: "Community manager",
        achievements: [
          <>Conception graphique pour les réseaux sociaux, les supports marketing et le packaging.</>,
          <>Production et montage vidéo.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Formation",
    institutions: [
      {
        name: "e-artsup Lyon",
        description: <>Bachelor Jeux vidéo, spécialité Game Design · 2024 – 2029 (en 3e année)</>,
      },
      {
        name: "Lycée Gaston Berger",
        description: <>BTS Communication · 2022 – 2024</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Compétences",
    skills: [
      {
        title: "Moteurs de jeu",
        description: <>Conception et prototypage de jeux sous Unity (C#) et Unreal Engine.</>,
        tags: [
          { name: "Unity", icon: "unity" },
          { name: "Unreal Engine", icon: "unreal" },
          { name: "C#", icon: "csharp" },
        ],
        images: [],
      },
      {
        title: "3D",
        description: <>Modélisation et sculpture 3D.</>,
        tags: [{ name: "Blender", icon: "blender" }, { name: "ZBrush" }],
        images: [],
      },
      {
        title: "Graphisme & illustration",
        description: <>Illustration, identité visuelle et supports de communication.</>,
        tags: [
          { name: "Photoshop", icon: "photoshop" },
          { name: "Illustrator", icon: "illustrator" },
          { name: "Procreate" },
        ],
        images: [],
      },
      {
        title: "Web",
        description: <>Intégration de pages web, pensées pour être claires et faciles à utiliser.</>,
        tags: [
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
        ],
        images: [],
      },
    ],
  },
};

// Pages désactivées dans once-ui.config.ts (routes). Gardées pour pouvoir les réactiver.
const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: `Articles de ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projets",
  title: `Projets – ${person.name}`,
  description: `Projets de ${person.name}`,
  // Chaque projet est un fichier .mdx dans app/work/projects
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galerie",
  title: `Galerie – ${person.name}`,
  description: `Galerie de ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
