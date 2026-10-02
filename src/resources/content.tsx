import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

// Tout ce qui est marqué [À REMPLIR] attend tes vraies infos.

const person: Person = {
  firstName: "Kaci",
  lastName: "Ait Messaoud",
  name: `Kaci Ait Messaoud`,
  role: "Développeur jeu vidéo",
  avatar: "/images/avatar.jpg", // [À REMPLIR] remplace l'image par ta photo
  email: "[ton.email@exemple.fr]",
  location: "Europe/Paris", // fuseau horaire IANA, sert aussi à afficher l'heure locale
  languages: ["Français", "Anglais"],
  locale: "fr",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Newsletter</>,
  description: <></>,
};

const social: Social = [
  // Les liens "essential: true" s'affichent aussi sur la page À propos
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/[À REMPLIR]",
    essential: true,
  },
  {
    name: "itch.io",
    icon: "itchio",
    link: "https://[À REMPLIR].itch.io",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/[À REMPLIR]",
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
  headline: <>Développeur jeu vidéo · Unity, shaders, VFX</>,
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: (
    <>[À REMPLIR : ce que tu cherches, ex. « Je cherche une alternance à partir de septembre 2027. »]</>
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
        [À REMPLIR : 3 à 4 phrases. Qui tu es, ta formation, ce qui te passionne dans le jeu vidéo
        (gameplay, shaders, VFX, 3D…) et le type de poste que tu cherches.]
      </>
    ),
  },
  work: {
    display: true, // passe à false si tu n'as pas encore d'expérience à montrer
    title: "Expériences",
    experiences: [
      {
        company: "[Entreprise ou studio]",
        timeframe: "[2025 – 2026]",
        role: "[Stage / alternance / poste]",
        achievements: [
          <>[À REMPLIR : ce que tu as fait, avec un résultat concret si possible.]</>,
          <>[À REMPLIR : une deuxième réalisation.]</>,
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
        name: "[École]",
        description: <>[À REMPLIR : diplôme, spécialité, années.]</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Compétences",
    skills: [
      {
        title: "Unity & C#",
        description: <>[À REMPLIR : gameplay, outils, systèmes que tu as programmés.]</>,
        tags: [{ name: "Unity", icon: "unity" }],
        images: [],
      },
      {
        title: "Shaders & VFX",
        description: <>[À REMPLIR : Shader Graph, HLSL, VFX Graph, particules…]</>,
        tags: [],
        images: [],
      },
      {
        title: "3D",
        description: <>[À REMPLIR : modélisation, texturing, intégration…]</>,
        tags: [{ name: "Blender", icon: "blender" }],
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
