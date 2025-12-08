import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import config from "./eslint.config";

export { defineConfig, eslint, globalIgnores, tseslint };

export default config;
