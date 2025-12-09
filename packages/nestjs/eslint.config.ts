import tusssEslint, { defineConfig, tseslint } from "@tusss/eslint";

export default defineConfig(
  {
    extends: [tusssEslint],
  },
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  }
);
