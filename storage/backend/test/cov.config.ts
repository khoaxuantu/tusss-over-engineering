import { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../src",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "<rootDir>/../scripts/ts-jest-transform-cov.js",
  },
  testEnvironment: "node",
  testEnvironmentOptions: {
    globalsCleanup: "on",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coveragePathIgnorePatterns: [
    ".module.ts",
    "main.ts",
    "test",
    "config",
    "src/admin-panel",
    "src/command",
    "module-definition",
    "schema-factory",
    "schema.helper.ts",
    "print.helper.ts",
    "coverage",
    "mock",
  ],
  coverageDirectory: "../coverage",
  coverageReporters: ["clover", "json", "lcov", "text-summary"],
};

export default config;
