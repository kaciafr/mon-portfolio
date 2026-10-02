import { Heading, Text, Button, Column, Row, Schema, Meta, Line } from "@once-ui-system/core";
import { home, about, person, baseURL, routes, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import DSConsole from "@/components/DSConsole/DSConsole";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* 1. Qui je suis, en une ligne */}
      <Column maxWidth="s" horizontal="center" align="center" gap="8">
        <Heading as="h1" wrap="balance" variant="display-strong-s">
          {person.name}
        </Heading>
        <Text wrap="balance" onBackground="brand-weak" variant="heading-default-l">
          {home.headline}
        </Text>
        <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l">
          {home.subline}
        </Text>
      </Column>

      {/* 2. La console : on choisit un projet, Start ouvre sa page */}
      <DSConsole />

      {/* 3. Accès directs, pour qui ne veut pas jouer */}
      <Row gap="12" wrap horizontal="center">
        {routes["/work"] && (
          <Button href={work.path} variant="primary" size="m" data-border="rounded" arrowIcon>
            Tous les projets
          </Button>
        )}
        <Button href={about.path} variant="secondary" size="m" data-border="rounded">
          À propos & CV
        </Button>
        <Button
          href={`mailto:${person.email}`}
          variant="secondary"
          size="m"
          data-border="rounded"
          prefixIcon="email"
        >
          Me contacter
        </Button>
      </Row>

      {/* 4. Les projets en version classique */}
      {routes["/work"] && (
        <Column fillWidth gap="l" marginTop="40">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Heading as="h2" variant="display-strong-xs" paddingX="l">
            Projets
          </Heading>
          <Projects />
        </Column>
      )}
    </Column>
  );
}
