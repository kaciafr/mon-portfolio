import { Column, IconButton, Line, Row, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const networks = social.filter((item) => item.link && item.icon !== "email");

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Column className={styles.mobile} fillWidth maxWidth="m" paddingX="16" paddingTop="40" gap="24">
        <Line background="neutral-alpha-weak" />

        {/* Coordonnées */}
        <Row
          fillWidth
          gap="24"
          horizontal="between"
          vertical="center"
          s={{ direction: "column", horizontal: "center", align: "center" }}
        >
          <Column gap="8" s={{ horizontal: "center" }}>
            <Text variant="heading-strong-m">Me contacter</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Stage dans le jeu vidéo ou alternance : écris-moi !
            </Text>
            <Row gap="16" wrap s={{ horizontal: "center" }}>
              <SmartLink href={`mailto:${person.email}`} prefixIcon="email">
                {person.email}
              </SmartLink>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {person.city}
              </Text>
            </Row>
          </Column>
          <Row gap="8">
            {networks.map((item) => (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon}
                tooltip={item.name}
                size="m"
                variant="secondary"
              />
            ))}
          </Row>
        </Row>

        <Text variant="body-default-s" onBackground="neutral-strong" paddingBottom="8">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            / Build your portfolio with{" "}
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Text>
      </Column>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
