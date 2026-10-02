// Jeux jouables dans le navigateur (builds Unity WebGL dans public/games/<slug>/).
// La clé est le slug de la page projet : /work/<slug> affiche alors un bouton « Jouer ».

export type Game = {
  title: string;
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  aspectRatio: string; // format de l'écran du jeu, ex. "16 / 9"
};

const build = (slug: string, files: Omit<Game, "title" | "aspectRatio">) =>
  Object.fromEntries(
    Object.entries(files).map(([key, file]) => [key, `/games/${slug}/${file}`]),
  ) as Omit<Game, "title" | "aspectRatio">;

export const games: Record<string, Game> = {
  "les-enquetes-toxiques": {
    title: "Les Enquêtes Toxiques",
    aspectRatio: "8 / 5",
    ...build("les-enquetes-toxiques", {
      loaderUrl: "UnityGame.loader.js",
      dataUrl: "UnityGame.data.br",
      frameworkUrl: "UnityGame.framework.js.br",
      codeUrl: "UnityGame.wasm.br",
    }),
  },
  "bas-les-masques": {
    title: "Bas les masques",
    aspectRatio: "16 / 9",
    ...build("bas-les-masques", {
      loaderUrl: "src.loader_01.js",
      dataUrl: "src.data.br",
      frameworkUrl: "src.framework_01.js.br",
      codeUrl: "src.wasm.br",
    }),
  },
};
