"use client";

import { Component, type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { MeshStandardMaterial, SRGBColorSpace, TextureLoader } from "three";
import type { AnimationClip, Group, Material, Mesh, Texture } from "three";
import type { Model3D } from "@/resources/models";

const isFbx = (src: string) => src.toLowerCase().endsWith(".fbx");

const textureLoader = new TextureLoader();
const loadTexture = (url: string) => textureLoader.loadAsync(url).catch(() => null);

// Remplace les matériaux du modèle par des matériaux PBR avec les textures du dossier.
// Renvoie un compteur qui change à chaque remplacement des matériaux.
function useTextures(object: Group, template: string | undefined, flipY: boolean) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!template) return;
    let cancelled = false;
    const created: Material[] = [];
    const meshes: Mesh[] = [];
    object.traverse((child) => {
      if ((child as Mesh).isMesh) meshes.push(child as Mesh);
    });

    const build = async (base: Material) => {
      const url = (map: string) => template.replace("{material}", base.name).replace("{map}", map);
      const [map, normalMap, metalnessMap, roughnessMap, emissiveMap] = await Promise.all(
        ["BaseColor", "Normal", "Metallic", "Roughness", "Emissive"].map((m) =>
          loadTexture(url(m)),
        ),
      );
      if (!map && !normalMap && !metalnessMap && !roughnessMap && !emissiveMap) return base;
      for (const t of [map, normalMap, metalnessMap, roughnessMap, emissiveMap]) {
        if (t) t.flipY = flipY;
      }
      for (const t of [map, emissiveMap]) {
        if (t) t.colorSpace = SRGBColorSpace;
      }
      const material = new MeshStandardMaterial({
        name: base.name,
        map,
        normalMap,
        metalnessMap,
        metalness: metalnessMap ? 1 : 0,
        roughnessMap,
        roughness: 1,
        emissiveMap,
        emissive: emissiveMap ? 0xffffff : 0x000000,
      });
      created.push(material);
      return material;
    };

    const cache = new Map<Material, Promise<Material>>();
    const convert = (m: Material) => {
      if (!cache.has(m)) cache.set(m, build(m));
      return cache.get(m)!;
    };

    const originals = meshes.map((mesh) => mesh.material);
    Promise.all(
      meshes.map(async (mesh) => {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const next = await Promise.all(mats.map(convert));
        return Array.isArray(mesh.material) ? next : next[0];
      }),
    ).then((results) => {
      if (cancelled) return;
      meshes.forEach((mesh, i) => {
        mesh.material = results[i];
      });
      setVersion((v) => v + 1);
    });

    return () => {
      cancelled = true;
      meshes.forEach((mesh, i) => {
        mesh.material = originals[i];
      });
      for (const m of created) {
        for (const t of Object.values(m)) if ((t as Texture)?.isTexture) (t as Texture).dispose();
        m.dispose();
      }
    };
  }, [object, template, flipY]);

  return version;
}

// Affiche le maillage en fil de fer.
function useWireframe(object: Group, wireframe: boolean, version: number) {
  useEffect(() => {
    const materials = new Set<Material & { wireframe?: boolean }>();
    object.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material])
        materials.add(m);
    });
    for (const m of materials) m.wireframe = wireframe;
    return () => {
      for (const m of materials) m.wireframe = false;
    };
  }, [object, wireframe, version]);
}

type AnimProps = {
  scale: number;
  textures?: string;
  wireframe: boolean;
  flipY: boolean; // les textures FBX sont à l'endroit avec flipY, celles des GLB non
  activeClip: string | null; // animation en cours, null = aucune
  onClips: (names: string[]) => void; // remonte la liste des animations du modèle
};

function Animated({
  object,
  clips,
  scale,
  textures,
  wireframe,
  flipY,
  activeClip,
  onClips,
}: AnimProps & { object: Group; clips: AnimationClip[] }) {
  const ref = useRef<Group>(null);
  const { actions, names } = useAnimations(clips, ref);
  const texturesVersion = useTextures(object, textures, flipY);
  useWireframe(object, wireframe, texturesVersion);

  useEffect(() => {
    onClips(names);
  }, [names, onClips]);

  useEffect(() => {
    const action = activeClip ? actions[activeClip] : null;
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, activeClip]);

  return <primitive ref={ref} object={object} scale={scale} />;
}

function GltfModel({ src, ...props }: Omit<AnimProps, "flipY"> & { src: string }) {
  const { scene, animations } = useGLTF(src);
  return <Animated object={scene} clips={animations} {...props} flipY={false} />;
}

function FbxModel({ src, ...props }: Omit<AnimProps, "flipY"> & { src: string }) {
  const fbx = useFBX(src);
  return <Animated object={fbx} clips={fbx.animations} {...props} flipY />;
}

// Si le fichier du modèle est introuvable ou illisible, on affiche un message au lieu de faire planter la page.
class ModelErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("[3D] Impossible de charger le modèle :", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const overlayStyle = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  pointerEvents: "none",
  color: "var(--neutral-on-background-weak)",
} as const;

// Indicateur de chargement en HTML normal, par-dessus la vue 3D.
// (Pas de <Html> de drei en fallback de Suspense : avec React 19 il provoque des erreurs de démontage.)
function Loader() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return <div style={overlayStyle}>Chargement… {Math.round(progress)} %</div>;
}

export default function ModelCanvas({
  model,
  activeClip,
  wireframe,
  onClips,
}: { model: Model3D } & Pick<AnimProps, "activeClip" | "wireframe" | "onClips">) {
  const [failedSlug, setFailedSlug] = useState<string | null>(null);
  const props = {
    src: model.src,
    scale: model.scale ?? 1,
    textures: model.textures,
    wireframe,
    activeClip,
    onClips,
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [3, 2, 5], fov: 45 }}
        style={{ touchAction: "none" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} />

        <ModelErrorBoundary key={model.slug} onError={() => setFailedSlug(model.slug)}>
          <Suspense fallback={null}>
            {/* Bounds cadre automatiquement la caméra, Center recentre le modèle */}
            <Bounds fit clip observe margin={1.2}>
              <Center>
                {isFbx(model.src) ? <FbxModel {...props} /> : <GltfModel {...props} />}
              </Center>
            </Bounds>
          </Suspense>
        </ModelErrorBoundary>

        <OrbitControls makeDefault autoRotate={model.autoRotate} autoRotateSpeed={1} />
      </Canvas>
      {failedSlug === model.slug ? (
        <div style={overlayStyle}>Modèle introuvable : {model.src}</div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
