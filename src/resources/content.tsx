import {
  About,
  Blog,
  Gallery,
  Home,
  Models3DPage,
  Newsletter,
  WebProjects,
  Person,
  Social,
  Work,
} from "@/types";

// Tout ce qui est marqué [À REMPLIR] attend tes vraies infos.

const person: Person = {
  firstName: "Kaci",
  lastName: "Ait Messaoud",
  name: `Kaci Ait Messaoud`,
  role: "Développeur Unity & Web",
  avatar: "/images/avatar.jpg",
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
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kaci-ait-messaoud-980b09215/",
    essential: true,
  },
  {
    name: "itch.io",
    icon: "itchio",
    link: "https://kaci2000.itch.io/",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/kaciafr",
    essential: true,
  },
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
  headline: <>Développeur Unity & Web</>,
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: (
    <>
      En 3e année de Bachelor Jeux vidéo à e-artsup Lyon. Je recherche un stage
      dans le jeu vidéo ou une alternance.
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
        Développeur Unity et web, en 3e année de Bachelor Jeux vidéo à e-artsup
        Lyon. Je programme des jeux en C# sous Unity, du prototype à la version
        jouable dans le navigateur, et je développe des sites en HTML, CSS,
        JavaScript et Tailwind. Mon parcours en communication (BTS) et en
        graphisme me permet de faire le lien entre le code, le game design et
        l&apos;interface. Je recherche un stage dans le jeu vidéo ou une
        alternance.
      </>
    ),
  },
  work: {
    display: true,
    title: "Expériences",
    experiences: [
      {
        company: "Mediactil",
        timeframe: "Juillet – septembre 2026 · Stage, puis freelance (en cours)",
        role: "Développeur web & UX designer",
        achievements: [
          <>
            GoScreen (PLV digitale, bornes et écrans interactifs) : ergonomie de
            l&apos;application et améliorations graphiques.
          </>,
          <>Rédaction de la documentation technique et création de l&apos;espace Notion.</>,
          <>
            Fitness Express, projet de mon maître de stage : développement de pages,
            intégration de landing pages et gestion de la base de données.
          </>,
        ],
        images: [],
      },
      {
        company: "Casa Leone · e-artsup × APEL du Rhône",
        timeframe: "Mars – mai 2026",
        role: "Développeur Unity & game designer",
        achievements: [
          <>
            Jeu coopératif à deux joueurs sur le thème du harcèlement, réalisé avec
            l&apos;association APEL du Rhône, en équipe de 6.
          </>,
          <>Système de sound design et character controller des personnages sous Unity (C#).</>,
          <>
            Machines à états pour plusieurs éléments du jeu, animations de l&apos;interface et
            outline sur certains assets.
          </>,
        ],
        images: [],
      },
      {
        company: "Mediactil",
        timeframe: "Novembre – décembre 2023",
        role: "Illustrateur & UX designer",
        achievements: [
          <>Développement web en HTML et CSS.</>,
          <>Conception graphique et ergonomie des interfaces.</>,
          <>Transformation créative de kiosques de vente.</>,
        ],
        images: [],
      },
      {
        company: "Emoli",
        timeframe: "Mai – juillet 2023",
        role: "Community manager",
        achievements: [
          <>
            Conception graphique pour les réseaux sociaux, les supports
            marketing et le packaging.
          </>,
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
        description: (
          <>
            Bachelor Jeux vidéo, spécialité Game Design · 2024 – 2029 (en 3e
            année)
          </>
        ),
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
        title: "Développement de jeux",
        description: (
          <>
            Programmation de jeux en C# sous Unity, du prototype au build WebGL
            jouable dans le navigateur. Prototypage sous Unreal Engine.
          </>
        ),
        tags: [
          { name: "Unity", icon: "unity" },
          { name: "Unreal Engine", icon: "unreal" },
          { name: "C#", icon: "csharp" },
        ],
        images: [],
      },
      {
        title: "Développement web",
        description: (
          <>
            Développement de sites responsives, clairs et faciles à utiliser.
          </>
        ),
        tags: [
          { name: "HTML", icon: "html" },
          { name: "CSS", icon: "css" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Tailwind", icon: "tailwind" },
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
        description: (
          <>Illustration, identité visuelle et supports de communication.</>
        ),
        tags: [
          { name: "Photoshop", icon: "photoshop" },
          { name: "Illustrator", icon: "illustrator" },
          { name: "Procreate" },
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

const web: WebProjects = {
  path: "/web",
  label: "Web",
  title: `Projets web – ${person.name}`,
  description: `Projets web de ${person.name}`,
  // Ajoute `tag: "web"` en haut d'un fichier de app/work/projects pour qu'il apparaisse ici
};

const models3d: Models3DPage = {
  path: "/3d",
  label: "3D",
  title: `Modèles 3D – ${person.name}`,
  description: `Modèles 3D de ${person.name}`,
  // Les modèles sont listés dans resources/models.ts
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  web,
  models3d,
};
