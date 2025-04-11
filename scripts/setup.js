#!/usr/bin/env node

/**
 * Interactive CLI setup for NextJS Template
 * This script allows users to customize their project by selecting optional features
 */

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

// Detect package manager
function detectPackageManager() {
    if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
        return 'yarn';
    } else if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
        return 'pnpm';
    } else if (fs.existsSync(path.join(process.cwd(), 'bun.lock'))) {
        return 'bun';
    }
    return 'npm';
}

const packageManager = detectPackageManager();

// Options for customization
const features = {
    authentication: {
        name: 'Authentication',
        message: 'Select an authentication provider:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'NextAuth.js', value: 'nextauth' },
            { name: 'Clerk', value: 'clerk' }
        ]
    },
    database: {
        name: 'Database Integration',
        message: 'Select a database solution:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'Prisma', value: 'prisma' },
            { name: 'Drizzle', value: 'drizzle' },
            { name: 'Mongoose (MongoDB)', value: 'mongoose' }
        ]
    },
    stateManagement: {
        name: 'State Management',
        message: 'Select a state management library:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'Redux Toolkit', value: 'redux' },
            { name: 'Zustand', value: 'zustand' },
            { name: 'Jotai', value: 'jotai' }
        ]
    },
    dataFetching: {
        name: 'API Data Fetching',
        message: 'Select a data fetching library:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'SWR', value: 'swr' },
            { name: 'React Query (TanStack Query)', value: 'react-query' }
        ]
    },
    formHandling: {
        name: 'Form Handling',
        message: 'Select a form handling library:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'React Hook Form', value: 'react-hook-form' },
            { name: 'Formik', value: 'formik' }
        ]
    },
    i18n: {
        name: 'Internationalization',
        message: 'Add internationalization support?',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'next-intl', value: 'next-intl' }
        ]
    },
    testing: {
        name: 'Testing Framework',
        message: 'Select a testing framework:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'Jest', value: 'jest' },
            { name: 'Vitest', value: 'vitest' }
        ]
    },
    analytics: {
        name: 'Analytics',
        message: 'Select an analytics solution:',
        choices: [
            { name: 'None', value: 'none' },
            { name: 'Google Analytics', value: 'google-analytics' },
            { name: 'Plausible', value: 'plausible' },
            { name: 'Vercel Analytics', value: 'vercel-analytics' }
        ]
    }
};

console.log('\n');
console.log(chalk.bold.cyan('┌───────────────────────────────────────────┐'));
console.log(chalk.bold.cyan('│                                           │'));
console.log(chalk.bold.cyan('│     ') + chalk.bold.white('Next.js Template Setup Wizard') + chalk.bold.cyan('     │'));
console.log(chalk.bold.cyan('│                                           │'));
console.log(chalk.bold.cyan('└───────────────────────────────────────────┘'));
console.log('\n');
console.log(chalk.dim('This interactive CLI allows you to customize your project with optional features.'));
console.log(chalk.dim('Select the options you want to include in your project.'));
console.log('\n');

// Prompt user with Inquirer
async function promptUser() {
    const questions = Object.entries(features).map(([key, feature]) => ({
        type: 'list',
        name: key,
        message: feature.message,
        choices: feature.choices,
        default: 'none'
    }));

    return inquirer.prompt(questions);
}

// Install selected features
async function installFeatures(selections) {
    console.log('\n');
    console.log(chalk.cyan('🛠️  Installing selected features...'));
    console.log('\n');

    // Map of features to their installation commands
    const installCommands = {
        authentication: {
            nextauth: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} next-auth`,
            clerk: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @clerk/nextjs`
        },
        database: {
            prisma: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} -D prisma && ${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @prisma/client && npx prisma init`,
            drizzle: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} drizzle-orm && ${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} -D drizzle-kit`,
            mongoose: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} mongoose`
        },
        stateManagement: {
            redux: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @reduxjs/toolkit react-redux`,
            zustand: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} zustand`,
            jotai: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} jotai`
        },
        dataFetching: {
            swr: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} swr`,
            'react-query': `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @tanstack/react-query`
        },
        formHandling: {
            'react-hook-form': `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} react-hook-form`,
            formik: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} formik yup`
        },
        i18n: {
            'next-intl': `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} next-intl`
        },
        testing: {
            jest: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`,
            vitest: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} -D vitest @testing-library/react @testing-library/user-event @vitejs/plugin-react jsdom`
        },
        analytics: {
            'google-analytics': `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @next/third-parties`,
            plausible: `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} next-plausible`,
            'vercel-analytics': `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @vercel/analytics`
        }
    };

    // Execute installation commands
    for (const [feature, selection] of Object.entries(selections)) {
        if (selection !== 'none' && installCommands[feature] && installCommands[feature][selection]) {
            const spinner = ora(`Installing ${chalk.cyan(selection)}...`).start();

            try {
                execSync(installCommands[feature][selection], { stdio: 'ignore' });
                spinner.succeed(`Successfully installed ${chalk.green(selection)}`);

                // Setup feature-specific configurations
                await setupFeatureConfig(feature, selection);

                // Apply file modifications for the feature
                await modifyExistingFiles(feature, selection);
            } catch (error) {
                spinner.fail(`Failed to install ${chalk.red(selection)}: ${error.message}`);
            }
        }
    }
}

// Setup feature-specific configurations
async function setupFeatureConfig(feature, selection) {
    const configSpinner = ora(`Setting up configuration for ${chalk.cyan(selection)}...`).start();

    // Create directories for selected features
    const createDirectories = {
        authentication: () => {
            if (!fs.existsSync('./app/api/auth')) {
                fs.mkdirSync('./app/api/auth', { recursive: true });
            }
        },
        database: () => {
            if (!fs.existsSync('./lib/db')) {
                fs.mkdirSync('./lib/db', { recursive: true });
            }
        },
        stateManagement: () => {
            if (!fs.existsSync('./lib/store')) {
                fs.mkdirSync('./lib/store', { recursive: true });
            }
        },
        i18n: () => {
            if (!fs.existsSync('./messages')) {
                fs.mkdirSync('./messages', { recursive: true });
            }
        },
        testing: () => {
            if (!fs.existsSync('./__tests__')) {
                fs.mkdirSync('./__tests__', { recursive: true });
            }
        }
    };

    // Create basic configuration files
    const createConfigFiles = {
        authentication: {
            nextauth: () => {
                // Create route.ts file for NextAuth.js
                const routeContent = `import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // This is a placeholder that returns a mock user
        if (credentials?.username === "user" && credentials?.password === "password") {
          return { id: "1", name: "User", email: "user@example.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };`;

                fs.writeFileSync('./app/api/auth/[...nextauth]/route.ts', routeContent);

                // Create auth.ts utility file
                const authUtilContent = `import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}`;

                fs.writeFileSync('./lib/auth.ts', authUtilContent);
            },
            clerk: () => {
                // Create middleware.ts for Clerk
                const middlewareContent = `import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/api/public"],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/no-auth-in-this-route"],
});
 
export const config = {
  // Matcher ignoring _next/static, _next/image, favicon.ico, public folder
  matcher: ["/((?!.+\\\\.[\\\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};`;

                fs.writeFileSync('./middleware.ts', middlewareContent);
            }
        },
        database: {
            prisma: () => {
                const dbContent = `import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}`;
                fs.writeFileSync('./lib/db/prisma.ts', dbContent);
            },
            drizzle: () => {
                const dbContent = `import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);`;
                fs.writeFileSync('./lib/db/drizzle.ts', dbContent);

                const drizzleConfigContent = `import type { Config } from "drizzle-kit";

export default {
    schema: "./lib/db/schema.ts",
    out: "./drizzle",
} satisfies Config;`;
                fs.writeFileSync('./drizzle.config.ts', drizzleConfigContent);
            },
            mongoose: () => {
                const dbContent = `import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

declare global {
    var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (global.mongoose.conn) {
        return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
        const opts = { bufferCommands: false };
        global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection);
    }
    
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
}`;
                fs.writeFileSync('./lib/db/mongoose.ts', dbContent);
            }
        },
        stateManagement: {
            redux: () => {
                const storeContent = `import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
    reducer: { counter: counterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`;
                fs.writeFileSync('./lib/store/store.ts', storeContent);

                if (!fs.existsSync('./lib/store/features')) {
                    fs.mkdirSync('./lib/store/features', { recursive: true });
                }
                const sliceContent = `import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState { value: number; }

const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; },
        incrementByAmount: (state, action: PayloadAction<number>) => { state.value += action.payload; },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;`;
                fs.writeFileSync('./lib/store/features/counterSlice.ts', sliceContent);

                const hooksContent = `import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`;
                fs.writeFileSync('./lib/store/hooks.ts', hooksContent);
            },
            zustand: () => {
                const storeContent = `import { create } from "zustand";

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));`;
                fs.writeFileSync('./lib/store/counterStore.ts', storeContent);
            },
            jotai: () => {
                const atomsContent = `import { atom } from "jotai";

export const countAtom = atom(0);
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

export const incrementCountAtom = atom(
    null,
    (get, set) => set(countAtom, get(countAtom) + 1)
);

export const decrementCountAtom = atom(
    null,
    (get, set) => set(countAtom, get(countAtom) - 1)
);`;
                fs.writeFileSync('./lib/store/atoms.ts', atomsContent);
            }
        },
        dataFetching: {
            swr: () => {
                const swrContent = `import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useData<T>(url: string) {
    const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher);
    return { data, isLoading, isError: error, mutate };
}`;
                fs.writeFileSync('./lib/hooks/useSWR.ts', swrContent);
            },
            'react-query': () => {
                const queryContent = `"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: { queries: { staleTime: 60 * 1000 } },
    }));
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}`;
                if (!fs.existsSync('./app/providers')) {
                    fs.mkdirSync('./app/providers', { recursive: true });
                }
                fs.writeFileSync('./app/providers/query-provider.tsx', queryContent);
            }
        },
        formHandling: {
            'react-hook-form': () => {
                const formContent = `"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string;
    email: string;
    message: string;
};

export function ContactForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" {...register("name", { required: "Name is required" })} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register("email", { required: "Email is required" })} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" {...register("message", { required: "Message is required" })} rows={4} />
                {errors.message && <p>{errors.message.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}`;
                if (!fs.existsSync('./components/forms')) {
                    fs.mkdirSync('./components/forms', { recursive: true });
                }
                fs.writeFileSync('./components/forms/contact-form.tsx', formContent);
            },
            formik: () => {
                const formikContent = `"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().min(10, 'Message is too short').required('Required'),
});

export function ContactForm() {
    return (
        <Formik
            initialValues={{ name: '', email: '', message: '' }}
            validationSchema={ContactSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values);
                setTimeout(() => {
                    setSubmitting(false);
                    resetForm();
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <Field as="textarea" id="message" name="message" rows={4} />
                        <ErrorMessage name="message" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
    );
}`;
                if (!fs.existsSync('./components/forms')) {
                    fs.mkdirSync('./components/forms', { recursive: true });
                }
                fs.writeFileSync('./components/forms/contact-form.tsx', formikContent);
            }
        },
        i18n: {
            'next-intl': () => {
                const middlewareContent = `import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
    locales: ['en', 'es', 'fr', 'de'],
    defaultLocale: 'en'
});
 
export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\\\..*).*)']
};`;
                fs.writeFileSync('./middleware.ts', middlewareContent);
                if (!fs.existsSync('./messages/en')) {
                    fs.mkdirSync('./messages/en', { recursive: true });
                }
                if (!fs.existsSync('./messages/es')) {
                    fs.mkdirSync('./messages/es', { recursive: true });
                }
                const enMessages = `{
    "Index": {
        "title": "Hello world!",
        "welcome": "Welcome to Next.js with next-intl"
    },
    "Navigation": {
        "home": "Home",
        "about": "About"
    }
}`;
                const esMessages = `{
    "Index": {
        "title": "¡Hola mundo!",
        "welcome": "Bienvenido a Next.js con next-intl"
    },
    "Navigation": {
        "home": "Inicio",
        "about": "Acerca de"
    }
}`;
                fs.writeFileSync('./messages/en/index.json', enMessages);
                fs.writeFileSync('./messages/es/index.json', esMessages);
                const i18nConfig = `import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
const locales = ['en', 'es', 'fr', 'de'];
 
export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale)) notFound();
    return {
        messages: (await import(\`../messages/\${locale}/index.json\`)).default
    };
});`;
                fs.writeFileSync('./i18n.ts', i18nConfig);
            }
        },
        testing: {
            jest: () => {
                const jestConfig = `const nextJest = require('next/jest');
 
const createJestConfig = nextJest({ dir: './' });
 
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/app/(.*)$': '<rootDir>/app/$1'
    },
};
 
module.exports = createJestConfig(customJestConfig);`;
                fs.writeFileSync('./jest.config.js', jestConfig);
                const jestSetup = `import '@testing-library/jest-dom';`;
                fs.writeFileSync('./jest.setup.js', jestSetup);
                const sampleTest = `import { render, screen } from '@testing-library/react';
import Page from '../app/page';

describe('Home page', () => {
    it('renders the heading', () => {
        render(<Page />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
    });
});`;
                fs.writeFileSync('./__tests__/page.test.tsx', sampleTest);

                const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
                packageJson.scripts.test = 'jest';
                packageJson.scripts['test:watch'] = 'jest --watch';
                fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
            },
            vitest: () => {
                const vitestConfig = `/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        include: ['__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
        },
    },
});`;
                fs.writeFileSync('./vitest.config.ts', vitestConfig);
                const vitestSetup = `import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
afterEach(() => cleanup());`;
                fs.writeFileSync('./vitest.setup.ts', vitestSetup);
                const sampleTest = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Page from '../app/page';

describe('Home page', () => {
    it('renders the heading', () => {
        render(<Page />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
    });
});`;
                fs.writeFileSync('./__tests__/page.test.tsx', sampleTest);

                const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
                packageJson.scripts.test = 'vitest run';
                packageJson.scripts['test:watch'] = 'vitest';
                fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
            }
        },
        analytics: {
            'google-analytics': () => {
                // Update layout.tsx to include Google Analytics as needed.
            },
            plausible: () => {
                // Update layout.tsx to include Plausible as needed.
            },
            'vercel-analytics': () => {
                const analyticsProvider = `"use client";

import { Analytics } from "@vercel/analytics/react";

export function AnalyticsProvider({ children }) {
    return (
        <>
            {children}
            <Analytics />
        </>
    );
}`;
                if (!fs.existsSync('./app/providers')) {
                    fs.mkdirSync('./app/providers', { recursive: true });
                }
                fs.writeFileSync('./app/providers/analytics-provider.tsx', analyticsProvider);
            }
        }
    };

    // Execute the function for the selected feature if it exists
    try {
        if (createDirectories[feature]) {
            createDirectories[feature]();
        }

        if (createConfigFiles[feature] && createConfigFiles[feature][selection]) {
            createConfigFiles[feature][selection]();
        }

        configSpinner.succeed(`Configuration for ${chalk.green(selection)} has been set up`);
    } catch (error) {
        configSpinner.fail(`Failed to configure ${chalk.red(selection)}: ${error.message}`);
    }
}

// Function to modify existing files based on selected features
async function modifyExistingFiles(feature, selection) {
    const modifySpinner = ora(`Updating project files for ${chalk.cyan(selection)}...`).start();

    try {
        const fileModifications = {
            authentication: {
                nextauth: async () => {
                    // Update providers.tsx to add session provider
                    if (fs.existsSync('./app/providers.tsx')) {
                        let providersContent = fs.readFileSync('./app/providers.tsx', 'utf8');

                        // Check if SessionProvider is already imported
                        if (!providersContent.includes('SessionProvider')) {
                            // Add SessionProvider import
                            providersContent = providersContent.replace(
                                /"use client";/,
                                `"use client";\n\nimport { SessionProvider } from "next-auth/react";`
                            );

                            // Add SessionProvider to the component
                            providersContent = providersContent.replace(
                                /export function Providers\(\{ children \}: \{ children: React\.ReactNode \}\) {/,
                                `export function Providers({ children }: { children: React.ReactNode }) {`
                            );

                            providersContent = providersContent.replace(
                                /<ThemeProvider[^>]*>([\s\S]*?)<\/ThemeProvider>/m,
                                `<SessionProvider>\n      <ThemeProvider$1</ThemeProvider>\n    </SessionProvider>`
                            );

                            fs.writeFileSync('./app/providers.tsx', providersContent);
                        }
                    }

                    // Create a simple login page
                    if (!fs.existsSync('./app/login')) {
                        fs.mkdirSync('./app/login', { recursive: true });

                        const loginPageContent = `"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 p-10 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Use username: "user" and password: "password" for demo
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full rounded-md border-0 p-2 mt-1 ring-1 ring-inset focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-md border-0 p-2 mt-1 ring-1 ring-inset focus:ring-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white hover:bg-primary-dark focus:outline-none focus:ring-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}`;

                        fs.writeFileSync('./app/login/page.tsx', loginPageContent);
                    }
                },
                clerk: async () => {
                    // Update providers.tsx to add ClerkProvider
                    if (fs.existsSync('./app/providers.tsx')) {
                        let providersContent = fs.readFileSync('./app/providers.tsx', 'utf8');

                        // Check if ClerkProvider is already imported
                        if (!providersContent.includes('ClerkProvider')) {
                            // Add ClerkProvider import
                            providersContent = providersContent.replace(
                                /"use client";/,
                                `"use client";\n\nimport { ClerkProvider } from "@clerk/nextjs";`
                            );

                            // Add ClerkProvider to the component
                            providersContent = providersContent.replace(
                                /export function Providers\(\{ children \}: \{ children: React\.ReactNode \}\) {/,
                                `export function Providers({ children }: { children: React.ReactNode }) {`
                            );

                            providersContent = providersContent.replace(
                                /<ThemeProvider[^>]*>([\s\S]*?)<\/ThemeProvider>/m,
                                `<ClerkProvider>\n      <ThemeProvider$1</ThemeProvider>\n    </ClerkProvider>`
                            );

                            fs.writeFileSync('./app/providers.tsx', providersContent);
                        }
                    }

                    // Create sign-in and sign-up pages
                    if (!fs.existsSync('./app/sign-in')) {
                        fs.mkdirSync('./app/sign-in', { recursive: true });

                        const signInPageContent = `import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <SignIn />
    </div>
  );
}`;

                        fs.writeFileSync('./app/sign-in/page.tsx', signInPageContent);
                    }

                    if (!fs.existsSync('./app/sign-up')) {
                        fs.mkdirSync('./app/sign-up', { recursive: true });

                        const signUpPageContent = `import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <SignUp />
    </div>
  );
}`;

                        fs.writeFileSync('./app/sign-up/page.tsx', signUpPageContent);
                    }
                }
            },
            dataFetching: {
                'react-query': async () => {
                    // Update providers.tsx to add TanstackQueryProvider
                    if (fs.existsSync('./app/providers.tsx')) {
                        let providersContent = fs.readFileSync('./app/providers.tsx', 'utf8');

                        // Check if TanstackQueryProvider is already imported
                        if (!providersContent.includes('TanstackQueryProvider')) {
                            // Add TanstackQueryProvider import
                            providersContent = providersContent.replace(
                                /"use client";/,
                                `"use client";\n\nimport { TanstackQueryProvider } from "./providers/query-provider";`
                            );

                            // Add TanstackQueryProvider to the component
                            providersContent = providersContent.replace(
                                /export function Providers\(\{ children \}: \{ children: React\.ReactNode \}\) {/,
                                `export function Providers({ children }: { children: React.ReactNode }) {`
                            );

                            providersContent = providersContent.replace(
                                /<ThemeProvider[^>]*>([\s\S]*?)<\/ThemeProvider>/m,
                                `<TanstackQueryProvider>\n      <ThemeProvider$1</ThemeProvider>\n    </TanstackQueryProvider>`
                            );

                            fs.writeFileSync('./app/providers.tsx', providersContent);
                        }
                    }

                    // Create a simple example component that uses React Query
                    if (!fs.existsSync('./components/examples')) {
                        fs.mkdirSync('./components/examples', { recursive: true });
                    }

                    const queryExampleContent = `"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export function PostsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      <ul className="space-y-2">
        {data?.slice(0, 5).map((post: any) => (
          <li key={post.id} className="p-4 border rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

                    fs.writeFileSync('./components/examples/posts-list.tsx', queryExampleContent);
                },
                swr: async () => {
                    // Create a simple example component that uses SWR
                    if (!fs.existsSync('./components/examples')) {
                        fs.mkdirSync('./components/examples', { recursive: true });
                    }

                    const swrExampleContent = `"use client";

import { useData } from "@/lib/hooks/useSWR";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function PostsList() {
  const { data, isLoading, isError } = useData<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      <ul className="space-y-2">
        {data?.slice(0, 5).map((post) => (
          <li key={post.id} className="p-4 border rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

                    fs.writeFileSync('./components/examples/posts-list.tsx', swrExampleContent);
                }
            },
            i18n: {
                'next-intl': async () => {
                    // Create locales directory and sample translation files if not already created
                    if (!fs.existsSync('./messages/en')) {
                        fs.mkdirSync('./messages/en', { recursive: true });
                    }

                    if (!fs.existsSync('./messages/es')) {
                        fs.mkdirSync('./messages/es', { recursive: true });
                    }

                    // Create a language switcher component
                    if (!fs.existsSync('./components/language-switcher.tsx')) {
                        const languageSwitcherContent = `"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname?.replace(\`/\${locale}\`, \`/\${newLocale}\`);
    startTransition(() => {
      router.push(newPath || \`/\${newLocale}\`);
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLocale("en")}
        className={\`px-2 py-1 rounded \${
          locale === "en" ? "bg-primary text-white" : "bg-gray-200"
        } \${isPending ? "opacity-50" : ""}\`}
        disabled={isPending}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("es")}
        className={\`px-2 py-1 rounded \${
          locale === "es" ? "bg-primary text-white" : "bg-gray-200"
        } \${isPending ? "opacity-50" : ""}\`}
        disabled={isPending}
      >
        ES
      </button>
    </div>
  );
}`;

                        fs.writeFileSync('./components/language-switcher.tsx', languageSwitcherContent);
                    }

                    // Update layout.tsx to work with next-intl
                    if (fs.existsSync('./app/layout.tsx')) {
                        let layoutContent = fs.readFileSync('./app/layout.tsx', 'utf8');

                        if (!layoutContent.includes('import { NextIntlClientProvider }')) {
                            layoutContent = layoutContent.replace(
                                /import { Inter } from/,
                                `import { NextIntlClientProvider } from 'next-intl';\nimport { Inter } from`
                            );

                            // Modify the root layout to support internationalization
                            layoutContent = layoutContent.replace(
                                /export default function RootLayout\(\{/,
                                `export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default function RootLayout({`
                            );

                            layoutContent = layoutContent.replace(
                                /children,/,
                                `children,\n  params: { locale },`
                            );

                            layoutContent = layoutContent.replace(
                                /<html lang="en">/,
                                `<html lang={locale}>`
                            );

                            layoutContent = layoutContent.replace(
                                /<Providers>/,
                                `<NextIntlClientProvider locale={locale}>\n        <Providers>`
                            );

                            layoutContent = layoutContent.replace(
                                /<\/Providers>/,
                                `</Providers>\n      </NextIntlClientProvider>`
                            );

                            fs.writeFileSync('./app/layout.tsx', layoutContent);
                        }
                    }

                    // Update project structure for internationalization
                    if (fs.existsSync('./app/page.tsx')) {
                        // Create the app/[locale] structure
                        if (!fs.existsSync('./app/[locale]')) {
                            fs.mkdirSync('./app/[locale]', { recursive: true });

                            // Move app content to app/[locale]
                            const pageContent = fs.readFileSync('./app/page.tsx', 'utf8');

                            // Add internationalization to the page
                            const i18nPageContent = `import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';

${pageContent.replace(
                                /<h1[^>]*>(.*?)<\/h1>/,
                                `<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{t('Index.title')}</h1>
        <p className="leading-7 mb-6">{t('Index.welcome')}</p>
        <LanguageSwitcher />`
                            ).replace(
                                /export default/,
                                `export default function Home() {
  const t = useTranslations();
  
  return (`
                            ).replace(
                                /<\/main>/,
                                `  );
}`
                            )}`;

                            fs.writeFileSync('./app/[locale]/page.tsx', i18nPageContent);

                            // Copy error.tsx if it exists
                            if (fs.existsSync('./app/error.tsx')) {
                                fs.copyFileSync('./app/error.tsx', './app/[locale]/error.tsx');
                            }

                            // Create layout for [locale]
                            fs.writeFileSync('./app/[locale]/layout.tsx', `export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
`);
                        }
                    }
                }
            },
            analytics: {
                'vercel-analytics': async () => {
                    // Update providers.tsx to add Analytics provider
                    if (fs.existsSync('./app/providers.tsx')) {
                        let providersContent = fs.readFileSync('./app/providers.tsx', 'utf8');

                        // Check if Analytics is already imported
                        if (!providersContent.includes('Analytics')) {
                            // Add Analytics import
                            providersContent = providersContent.replace(
                                /"use client";/,
                                `"use client";\n\nimport { Analytics } from "@vercel/analytics/react";`
                            );

                            // Add Analytics component
                            providersContent = providersContent.replace(
                                /<\/ThemeProvider>/,
                                `</ThemeProvider>\n      <Analytics />`
                            );

                            fs.writeFileSync('./app/providers.tsx', providersContent);
                        }
                    }
                },
                'google-analytics': async () => {
                    // Add GoogleAnalytics script to layout.tsx
                    if (fs.existsSync('./app/layout.tsx')) {
                        let layoutContent = fs.readFileSync('./app/layout.tsx', 'utf8');

                        if (!layoutContent.includes('GoogleAnalytics')) {
                            // Add GoogleAnalytics import
                            layoutContent = layoutContent.replace(
                                /import { Providers } from/,
                                `import { GoogleAnalytics } from "@next/third-parties/google";\nimport { Providers } from`
                            );

                            // Add GoogleAnalytics to the component
                            layoutContent = layoutContent.replace(
                                /<\/body>/,
                                `  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />\n      </body>`
                            );

                            fs.writeFileSync('./app/layout.tsx', layoutContent);
                        }
                    }
                },
                'plausible': async () => {
                    // Add Plausible to layout.tsx
                    if (fs.existsSync('./app/layout.tsx')) {
                        let layoutContent = fs.readFileSync('./app/layout.tsx', 'utf8');

                        if (!layoutContent.includes('PlausibleProvider')) {
                            // Add Plausible import
                            layoutContent = layoutContent.replace(
                                /import { Providers } from/,
                                `import PlausibleProvider from "next-plausible";\nimport { Providers } from`
                            );

                            // Wrap the html element with PlausibleProvider
                            layoutContent = layoutContent.replace(
                                /<html/,
                                `<PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN as string}>\n      <html`
                            );

                            layoutContent = layoutContent.replace(
                                /<\/html>/,
                                `</html>\n    </PlausibleProvider>`
                            );

                            fs.writeFileSync('./app/layout.tsx', layoutContent);
                        }
                    }
                }
            }
        };

        // Execute the file modification function for the selected feature if it exists
        if (fileModifications[feature] && fileModifications[feature][selection]) {
            await fileModifications[feature][selection]();
        }

        modifySpinner.succeed(`Project files updated for ${chalk.green(selection)}`);
    } catch (error) {
        modifySpinner.fail(`Failed to update project files for ${chalk.red(selection)}: ${error.message}`);
    }
}

// Generate an .env.example file based on selections
function generateEnvExample(selections) {
    const envSpinner = ora(`Generating environment variables example file...`).start();

    try {
        let envContent = "# Environment Variables\n# Copy this file to .env.local and update with your values\n\n";

        if (selections.authentication === 'nextauth') {
            envContent += "# NextAuth.js\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=your-secret-key-at-least-32-chars\n\n";
        } else if (selections.authentication === 'clerk') {
            envContent += "# Clerk Authentication\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key\nCLERK_SECRET_KEY=your-secret-key\n\n";
        }

        if (selections.database === 'prisma') {
            envContent += "# Prisma Database\nDATABASE_URL=your-database-connection-string\n\n";
        } else if (selections.database === 'drizzle') {
            envContent += "# Drizzle Database\nDATABASE_URL=your-database-connection-string\n\n";
        } else if (selections.database === 'mongoose') {
            envContent += "# MongoDB Connection\nMONGODB_URI=your-mongodb-connection-string\n\n";
        }

        if (selections.analytics === 'google-analytics') {
            envContent += "# Google Analytics\nNEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX\n\n";
        } else if (selections.analytics === 'plausible') {
            envContent += "# Plausible Analytics\nNEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com\n\n";
        }

        fs.writeFileSync('./.env.example', envContent);
        envSpinner.succeed('Generated .env.example file with required environment variables');
    } catch (error) {
        envSpinner.fail(`Failed to generate .env.example: ${error.message}`);
    }
}

// Display summary and final steps
function displaySummary(selections) {
    console.log('\n');
    console.log(chalk.bold.green('🎉 Setup Complete!'));
    console.log('\n');

    console.log(chalk.bold('Selected features:'));

    const selectedFeatures = Object.entries(selections)
        .filter(([_, value]) => value !== 'none')
        .map(([key, value]) => `- ${chalk.cyan(features[key].name)}: ${chalk.green(value)}`);

    if (selectedFeatures.length > 0) {
        selectedFeatures.forEach(feature => console.log(feature));
    } else {
        console.log(chalk.dim('- No additional features selected'));
    }

    console.log('\n');
    console.log(chalk.bold('Next steps:'));
    console.log(`${chalk.cyan('1.')} Review the installed packages in package.json`);
    console.log(`${chalk.cyan('2.')} Check the configuration files created for your selected features`);

    if (Object.values(selections).some(val => val !== 'none')) {
        console.log(`${chalk.cyan('3.')} Copy .env.example to .env.local and update with your values`);
        console.log(`${chalk.cyan('4.')} Start the development server with: ${chalk.green(`${packageManager} ${packageManager === 'npm' ? 'run ' : ''}dev`)}`);
    } else {
        console.log(`${chalk.cyan('3.')} Start the development server with: ${chalk.green(`${packageManager} ${packageManager === 'npm' ? 'run ' : ''}dev`)}`);
    }

    console.log('\n');
    console.log(chalk.bold.cyan('Happy coding! 🚀'));
    console.log('\n');
}

// Main function to run the setup
async function main() {
    try {
        const selections = await promptUser();
        await installFeatures(selections);
        generateEnvExample(selections);
        displaySummary(selections);
    } catch (error) {
        console.error(chalk.red(`\n❌ Setup failed: ${error.message}`));
        process.exit(1);
    }
}

// Run the main function
main();
