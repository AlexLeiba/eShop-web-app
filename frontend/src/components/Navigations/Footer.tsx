import { useTranslation } from "react-i18next";
import { Container } from "../Grid/Container";
import { Spacer } from "../ui/spacer";
import { Logo } from "./Logo";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function Footer() {
  const { t } = useTranslation("translation", { keyPrefix: "FooterSection" });
  const links = [
    {
      name: t("links.products"),
      slug: "/products?sort=newest&page=1",
    },
    {
      name: t("links.wishlist"),
      slug: "/wishlist",
    },
    {
      name: t("links.cart"),
      slug: "/cart",
    },
    {
      name: t("links.termsAndConditions"),
      slug: "/",
    },
  ];
  const contactLinks = [
    {
      name: t("contact.email"),
      icon: <IconMail />,
      slug: "mailto:leiba.alexandru@gmail.com",
    },

    {
      name: t("contact.github"),
      icon: <IconBrandGithub />,
      slug: "https://github.com/AlexLeiba",
    },
    {
      name: t("contact.linkedin"),
      icon: <IconBrandLinkedin />,
      slug: "https://www.linkedin.com/in/alex-leiba-9205801ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
  ];
  return (
    <div className="w-full  bg-gray-300 dark:bg-gray-900 dark:text-white py-8 px-8 flex items-center">
      <Container className="grid grid-cols-3 gap-8">
        {/* left */}
        <div>
          <Logo />
          <Spacer sm={2} md={2} lg={2} />
        </div>

        <div>
          <h5 className="text-2xl font-bold">{t("links.title")}</h5>
          <Spacer sm={2} md={2} lg={2} />
          {links.map((link) => {
            return (
              <div key={link.slug} title={link.name}>
                <a href={link.slug} className=" text-md">
                  {link.name}
                </a>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-2xl font-bold">{t("contact.title")}</h4>
          <Spacer sm={2} md={2} lg={2} />
          {contactLinks.map((link) => {
            return (
              <div key={link.name} className="flex items-center gap-1">
                <div>{link.icon}</div>
                <Link
                  to={link.slug}
                  className="text-md"
                  target="_blank"
                  title={link.name}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
