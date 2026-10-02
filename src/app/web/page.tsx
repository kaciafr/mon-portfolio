import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, web } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: web.title,
    description: web.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(web.title)}`,
    path: web.path,
  });
}

export default function Web() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={web.path}
        title={web.title}
        description={web.description}
        image={`/api/og/generate?title=${encodeURIComponent(web.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {web.title}
      </Heading>
      <Projects tag="web" />
    </Column>
  );
}
