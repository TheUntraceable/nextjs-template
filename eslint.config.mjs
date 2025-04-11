import js from "@eslint/js";
import { createRequire } from "node:module";

// Create a require function for importing CommonJS modules
const require = createRequire(import.meta.url);

// Load plugins
const globals = require("globals");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const prettierPlugin = require("eslint-plugin-prettier");
const importPlugin = require("eslint-plugin-import");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const sonarjsPlugin = require("eslint-plugin-sonarjs");
const securityPlugin = require("eslint-plugin-security");
const promisePlugin = require("eslint-plugin-promise");
const tailwindcssPlugin = require("eslint-plugin-tailwindcss");
const unicornPlugin = require("eslint-plugin-unicorn");
const perfectionistPlugin = require("eslint-plugin-perfectionist");
const importHelpersPlugin = require("eslint-plugin-import-helpers");
const nextPlugin = require("@next/eslint-plugin-next");
const performancePlugin = require("eslint-plugin-react-perf");
const eslintCommentsPlugin = require("eslint-plugin-eslint-comments");

export default [
    // Ignore patterns
    {
        ignores: [
            ".now/*",
            "**/*.css",
            "**/.changeset",
            "**/dist",
            "esm/*",
            "public/*",
            "tests/*",
            "scripts/*",
            "**/*.config.js",
            "**/.DS_Store",
            "**/node_modules",
            "**/coverage",
            "**/.next",
            "**/build",
            "!**/.commitlintrc.cjs",
            "!**/.lintstagedrc.cjs",
            "!**/jest.config.js",
            "!**/plopfile.js",
            "!**/react-shim.js",
            "!**/tsup.config.ts",
        ],
    },

    // Base JS configuration
    js.configs.recommended,

    // TypeScript configuration
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@typescript-eslint": typescriptPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2023,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
                project: "./tsconfig.json",
                tsconfigRootDir: ".",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    args: "after-used",
                    ignoreRestSiblings: false,
                    argsIgnorePattern: "^_.*?$",
                },
            ],
            // Enhanced TypeScript rules (type-aware)
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-unnecessary-condition": "warn",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
            "@typescript-eslint/prefer-nullish-coalescing": "warn",
            "@typescript-eslint/prefer-optional-chain": "warn",
            "@typescript-eslint/ban-ts-comment": ["warn", {
                "ts-ignore": "allow-with-description"
            }],
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "interface",
                    format: ["PascalCase"],
                    prefix: ["I"],
                },
                {
                    selector: "typeAlias",
                    format: ["PascalCase"],
                    prefix: ["T"],
                },
                {
                    selector: "enum",
                    format: ["PascalCase"],
                    prefix: ["E"],
                },
            ],
        },
    },

    // React configuration
    {
        files: ["**/*.jsx", "**/*.tsx"],
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11yPlugin,
            "react-perf": performancePlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react-hooks/exhaustive-deps": ["warn", {
                "additionalHooks": "(useRecoilCallback|useRecoilTransaction_UNSTABLE)"
            }],
            "jsx-a11y/click-events-have-key-events": "warn",
            "jsx-a11y/interactive-supports-focus": "warn",
            "react/self-closing-comp": "warn",
            "react/jsx-sort-props": [
                "warn",
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                },
            ],
            // Enhanced React rules
            "react/function-component-definition": [
                "warn",
                {
                    namedComponents: "arrow-function",
                    unnamedComponents: "arrow-function",
                },
            ],
            "react/no-array-index-key": "warn",
            "react/jsx-boolean-value": ["warn", "never"],
            "react/jsx-no-useless-fragment": "warn",
            // React performance rules
            "react-perf/jsx-no-new-object-as-prop": "warn",
            "react-perf/jsx-no-new-array-as-prop": "warn",
            "react-perf/jsx-no-new-function-as-prop": "warn",
            "react-perf/jsx-no-jsx-as-prop": "warn",
        },
    },

    // Next.js configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            "@next/next/no-html-link-for-pages": "error",
            "@next/next/no-img-element": "warn",
            "@next/next/no-unwanted-polyfillio": "warn",
            "@next/next/no-sync-scripts": "warn",
            "@next/next/google-font-display": "warn",
            "@next/next/google-font-preconnect": "warn",
        },
    },

    // Prettier configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "warn",
        },
    },

    // Import plugins configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            import: importPlugin,
            "unused-imports": unusedImportsPlugin,
            "import-helpers": importHelpersPlugin,
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
        rules: {
            "no-unused-vars": "off",
            "unused-imports/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "warn",
            "import/order": "off",
            "import-helpers/order-imports": [
                "warn",
                {
                    newlinesBetween: "always",
                    groups: ["module", "/^@/", ["parent", "sibling", "index"]],
                    alphabetize: {
                        order: "asc",
                        ignoreCase: true,
                    },
                },
            ],
            // Enhanced import rules
            "import/no-absolute-path": "error",
            "import/no-self-import": "error",
            "import/no-cycle": ["warn", { maxDepth: 3 }],
            "import/no-useless-path-segments": ["warn", { noUselessIndex: true }],
            "import/first": "warn",
            "import/no-duplicates": "warn",
            "import/exports-last": "warn",
            "import/no-unresolved": "off",
            "import/prefer-default-export": "off",
            "import/no-named-as-default": "off",
            "import/namespace": "off",
        },
    },

    // SonarJS configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            sonarjs: sonarjsPlugin,
        },
        rules: {
            ...sonarjsPlugin.configs.recommended.rules,
            "sonarjs/no-duplicate-string": ["warn", { threshold: 3 }],
            "sonarjs/cognitive-complexity": ["warn", 15],
            "sonarjs/no-nested-template-literals": "warn",
            "sonarjs/no-identical-functions": "warn",
            "sonarjs/prefer-immediate-return": "warn",
            "sonarjs/no-empty-collection": "error",
        },
    },

    // Security configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            security: securityPlugin,
        },
        rules: {
            ...securityPlugin.configs.recommended.rules,
            "security/detect-object-injection": "off",
        },
    },

    // Promise configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            promise: promisePlugin,
        },
        rules: {
            ...promisePlugin.configs.recommended.rules,
        },
    },

    // Tailwind CSS configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            tailwindcss: tailwindcssPlugin,
        },
        settings: {
            tailwindcss: {
                callees: ["cn", "cva", "clsx", "twMerge", "twJoin"],
                config: "tailwind.config.js",
                removeDuplicates: true,
                classRegex: "^(class(Name)?|tw)$",
            },
        },
        rules: {
            ...tailwindcssPlugin.configs.recommended.rules,
            "tailwindcss/no-custom-classname": "warn",
            "tailwindcss/classnames-order": "warn",
            "tailwindcss/enforces-negative-arbitrary-values": "warn",
            "tailwindcss/enforces-shorthand": "warn",
            "tailwindcss/migration-from-tailwind-2": "warn",
        },
    },

    // Unicorn configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            unicorn: unicornPlugin,
        },
        rules: {
            "unicorn/no-null": "off",
            "unicorn/prevent-abbreviations": "off",
        },
    },

    // Perfectionist configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            perfectionist: perfectionistPlugin,
        },
        rules: {
            "perfectionist/sort-objects": [
                "warn",
                {
                    type: "natural",
                    order: "asc",
                },
            ],
        },
    },

    // ESLint Comments configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            "eslint-comments": eslintCommentsPlugin,
        },
        rules: {
            "eslint-comments/no-unused-disable": "warn",
            "eslint-comments/no-unlimited-disable": "warn",
            "eslint-comments/require-description": ["warn", { ignore: ["eslint-enable"] }],
        },
    },

    // General rules
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        rules: {
            "no-console": "warn",
            "padding-line-between-statements": [
                "warn",
                { blankLine: "always", prev: "*", next: "return" },
                {
                    blankLine: "always",
                    prev: ["const", "let", "var"],
                    next: "*",
                },
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"],
                },
            ],
        },
    },
];