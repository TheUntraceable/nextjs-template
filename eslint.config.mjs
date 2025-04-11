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
        ]
    },

    // Base JS configuration
    js.configs.recommended,

    // TypeScript configuration
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@typescript-eslint": typescriptPlugin
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", {
                args: "after-used",
                ignoreRestSiblings: false,
                argsIgnorePattern: "^_.*?$"
            }]
        }
    },

    // React configuration
    {
        files: ["**/*.jsx", "**/*.tsx"],
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11yPlugin
        },
        settings: {
            react: {
                version: "detect"
            }
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react-hooks/exhaustive-deps": "off",
            "jsx-a11y/click-events-have-key-events": "warn",
            "jsx-a11y/interactive-supports-focus": "warn",
            "react/self-closing-comp": "warn",
            "react/jsx-sort-props": ["warn", {
                callbacksLast: true,
                shorthandFirst: true,
                noSortAlphabetically: false,
                reservedFirst: true
            }]
        }
    },

    // Next.js configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin
        },
        rules: {
            ...nextPlugin.configs.recommended.rules
        }
    },

    // Prettier configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            "prettier/prettier": "warn"
        }
    },

    // Import plugins configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            import: importPlugin,
            "unused-imports": unusedImportsPlugin,
            "import-helpers": importHelpersPlugin
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"]
                }
            }
        },
        rules: {
            "no-unused-vars": "off",
            "unused-imports/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "warn",
            "import/order": "off",
            "import-helpers/order-imports": ["warn", {
                newlinesBetween: "always",
                groups: [
                    "module",
                    "/^@/",
                    ["parent", "sibling", "index"]
                ],
                alphabetize: {
                    order: "asc",
                    ignoreCase: true
                }
            }]
        }
    },

    // SonarJS configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            sonarjs: sonarjsPlugin
        },
        rules: {
            ...sonarjsPlugin.configs.recommended.rules,
            "sonarjs/no-duplicate-string": ["warn", { threshold: 3 }],
            "sonarjs/cognitive-complexity": ["warn", 15]
        }
    },

    // Security configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            security: securityPlugin
        },
        rules: {
            ...securityPlugin.configs.recommended.rules,
            "security/detect-object-injection": "off"
        }
    },

    // Promise configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            promise: promisePlugin
        },
        rules: {
            ...promisePlugin.configs.recommended.rules
        }
    },

    // Tailwind CSS configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            tailwindcss: tailwindcssPlugin
        },
        settings: {
            tailwindcss: {
                callees: ["cn", "cva"],
                config: "tailwind.config.js"
            }
        },
        rules: {
            ...tailwindcssPlugin.configs.recommended.rules,
            "tailwindcss/no-custom-classname": "warn",
            "tailwindcss/classnames-order": "warn"
        }
    },

    // Unicorn configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            unicorn: unicornPlugin
        },
        rules: {
            "unicorn/no-null": "off",
            "unicorn/prevent-abbreviations": "off",
        }
    },

    // Perfectionist configuration
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: {
            perfectionist: perfectionistPlugin
        },
        rules: {
            "perfectionist/sort-objects": ["warn", {
                type: "natural",
                order: "asc"
            }]
        }
    },

    // General rules
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        rules: {
            "no-console": "warn",
            "padding-line-between-statements": [
                "warn",
                { "blankLine": "always", "prev": "*", "next": "return" },
                { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
                { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"] }
            ]
        }
    }
];