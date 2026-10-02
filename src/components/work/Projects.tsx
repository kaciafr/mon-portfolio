import { getPosts } from "@/utils/utils";
import { Column, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  tag?: string; // n'afficher que les projets avec ce tag (ex. "web")
  excludeTag?: string; // masquer les projets avec ce tag
}

export function Projects({ range, exclude, tag, excludeTag }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  if (tag) {
    allProjects = allProjects.filter((post) => post.metadata.tag === tag);
  }
  if (excludeTag) {
    allProjects = allProjects.filter((post) => post.metadata.tag !== excludeTag);
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (displayedProjects.length === 0) {
    return (
      <Text align="center" onBackground="neutral-weak">
        Aucun projet pour le moment.
      </Text>
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          linkLabel={post.metadata.tag === "web" ? "Visiter le site" : undefined}
        />
      ))}
    </Column>
  );
}
