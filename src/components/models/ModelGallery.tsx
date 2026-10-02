"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Column, Row, Text, ToggleButton } from "@once-ui-system/core";
import { models } from "@/resources/models";

// Three.js n'est chargé que sur cette page, et uniquement côté navigateur.
const ModelCanvas = dynamic(() => import("./ModelCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function ModelGallery() {
  const [selected, setSelected] = useState(0);
  const [clips, setClips] = useState<string[]>([]);
  const [activeClip, setActiveClip] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const model = models[selected];

  // Appelé par la vue 3D une fois le modèle chargé, avec la liste de ses animations.
  const handleClips = useCallback(
    (names: string[]) => {
      setClips(names);
      setActiveClip(model?.animate === false ? null : (names[0] ?? null));
    },
    [model],
  );

  const selectModel = (index: number) => {
    setSelected(index);
    setClips([]);
    setActiveClip(null);
  };

  if (!model) {
    return (
      <Text onBackground="neutral-weak">Aucun modèle pour le moment.</Text>
    );
  }

  return (
    <Column fillWidth gap="16">
      {models.length > 1 && (
        <Row gap="8" wrap>
          {models.map((m, index) => (
            <ToggleButton
              key={m.slug}
              label={m.title}
              selected={index === selected}
              onClick={() => selectModel(index)}
            />
          ))}
        </Row>
      )}
      <Column
        fillWidth
        radius="l"
        border="neutral-alpha-weak"
        background="neutral-alpha-weak"
        overflow="hidden"
        style={{ aspectRatio: "16 / 10", minHeight: 320 }}
      >
        <ModelCanvas
          model={model}
          activeClip={activeClip}
          wireframe={wireframe}
          onClips={handleClips}
        />
      </Column>
      <Row gap="8" wrap vertical="center">
        <ToggleButton
          prefixIcon="grid"
          label="Wireframe"
          selected={wireframe}
          onClick={() => setWireframe(!wireframe)}
        />
        {clips.map((name) => (
          <ToggleButton
            key={name}
            prefixIcon={activeClip === name ? "pause" : "play"}
            label={clips.length > 1 ? clipLabel(name) : "Animation"}
            selected={activeClip === name}
            onClick={() => setActiveClip(activeClip === name ? null : name)}
          />
        ))}
      </Row>
      <Column gap="4">
        <Text variant="heading-strong-l">{model.title}</Text>
        {model.description && (
          <Text variant="body-default-m" onBackground="neutral-weak">
            {model.description}
          </Text>
        )}
        <Text variant="body-default-s" onBackground="neutral-weak">
          Clic gauche : tourner · Molette : zoomer · Clic droit : déplacer
        </Text>
      </Column>
    </Column>
  );
}

// Les noms exportés depuis Blender/Mixamo ressemblent à « Armature|mixamo.com|Layer0 » : on garde la dernière partie.
function clipLabel(name: string) {
  return name.split("|").pop() || name;
}
