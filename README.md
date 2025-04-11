# Next.js & HeroUI + ShadCN Template

This is a template for creating applications using Next.js 15 (app directory) and HeroUI (v2).

[Try it on CodeSandbox](https://githubbox.com/TheUntraceable/NextJS-Template)

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [ShadCN](https://ui.shadcn.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Million](https://million.dev/)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/TheUntraceable/NextJS-Template my-app
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun install
```

### Run the interactive setup (optional)

This template comes with an interactive CLI setup tool that allows you to customize your project with optional features:

```bash
bun run setup
```

The setup CLI will guide you through selecting from the following optional features:

- Authentication (NextAuth.js or Clerk)
- Database integration (Prisma, Drizzle, or Mongoose)
- State management (Redux Toolkit, Zustand, or Jotai)
- API data fetching (SWR or React Query)
- Form handling (React Hook Form or Formik)
- Internationalization (next-intl)
- Testing framework (Jest or Vitest)
- Analytics integration

### Run the development server

```bash
bun dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT License](./LICENSE). For more details, please refer to the LICENSE file in this repository.
