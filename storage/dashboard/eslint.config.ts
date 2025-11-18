import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
    },
    ignores: ["**/node_modules/**", "**/.next/**"],
  },
  eslintPluginPrettier,
  eslintConfigPrettier,
]);
