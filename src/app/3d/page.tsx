import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import ModelGallery from "@/components/models/ModelGallery";
import { baseURL, models3d, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: models3d.title,
    description: models3d.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(models3d.title)}`,
    path: models3d.path,
  });
}

export default function Models3D() {
  return (
    <Column maxWidth="m" gap="24" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={models3d.title}
        description={models3d.description}
        path={models3d.path}
        image={`/api/og/generate?title=${encodeURIComponent(models3d.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${models3d.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading variant="heading-strong-xl">{models3d.label}</Heading>
      <ModelGallery />
    </Column>
  );
}
