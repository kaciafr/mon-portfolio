// Modèles 3D affichés sur la page /3d (fichiers dans public/models/).
// Formats acceptés : .glb / .gltf (recommandé, bien plus léger) ou .fbx.
// Convertir un FBX : Blender > Export glTF 2.0 (.glb), puis
//   npx gltf-transform optimize modele.glb modele.glb --compress draco --texture-compress webp

export type Model3D = {
  slug: string;
  title: string;
  description?: string;
  src: string;
  scale?: number; 
  autoRotate?: boolean;
  textures?: string;
  animate?: boolean; // false = pas d'animation lancée à l'ouverture (true par défaut), les boutons restent dispo
};

export const models: Model3D[] = [
  {
    slug: "robot",
    title: "Robot",
    src: "/models/robotrework.glb",
    autoRotate: true,
    animate: false,
    textures: "/models/robot/Robot_{material}_{map}.webp",
  },
   {
     slug: "manteau",
     title: "Manteau",
     description: "Modélisé et texturé dans Blender.",
     src: "/models/manteau.glb",
     autoRotate: true,
  },
    {
     slug: "pistoletjinx",
     title: "Pistolet Jinx",
     description: "Modélisé et texturé dans Blender.",
     src: "/models/pistoletjinx.glb",
     autoRotate: true,
   },
];
