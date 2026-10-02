import { notFound } from "next/navigation";
import { Column, Heading, Meta, SmartLink, Text } from "@once-ui-system/core";
import { baseURL, work } from "@/resources";
import { games } from "@/resources/games";
import { UnityPlayer } from "@/components/UnityPlayer/UnityPlayer";

export function generateStaticParams() {
  return Object.keys(games).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games[slug];
  if (!game) return {};
  return Meta.generate({
    title: `Jouer à ${game.title}`,
    description: `${game.title}, jouable dans le navigateur.`,
    baseURL: baseURL,
    path: `${work.path}/${slug}/play`,
  });
}

export default async function Play({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games[slug];
  if (!game) notFound();

  return (
    <Column as="section" maxWidth="l" fillWidth horizontal="center" gap="l" paddingX="16">
      <Column horizontal="center" align="center" gap="8">
        <SmartLink href={`${work.path}/${slug}`}>
          <Text variant="label-strong-m">← Retour au projet</Text>
        </SmartLink>
        <Heading variant="display-strong-s">{game.title}</Heading>
      </Column>
      <UnityPlayer game={game} />
    </Column>
  );
}
