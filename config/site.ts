export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  description: "Make beautiful websites regardless of your design experience.",
  links: {
    discord: "https://discord.gg/9b6yyZKmH4",
    docs: "https://heroui.com",
    github: "https://github.com/heroui-inc/heroui",
    sponsor: "https://patreon.com/jrgarciadev",
    twitter: "https://twitter.com/hero_ui",
  },
  name: "Next.js + HeroUI",
  navItems: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/about",
      label: "About",
    },
  ],
  navMenuItems: [
    {
      href: "/profile",
      label: "Profile",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/projects",
      label: "Projects",
    },
    {
      href: "/team",
      label: "Team",
    },
    {
      href: "/calendar",
      label: "Calendar",
    },
    {
      href: "/settings",
      label: "Settings",
    },
    {
      href: "/help-feedback",
      label: "Help & Feedback",
    },
    {
      href: "/logout",
      label: "Logout",
    },
  ],
};
