import { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../src",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    // "^.+\\.(t|j)s$": "<rootDir>/../scripts/ts-jest-transform.js",
    "^.+\\.(t|j)s$": "@swc/jest",
  },
  testEnvironment: "node",
  testEnvironmentOptions: {
    globalsCleanup: "on",
  },
};

export default config;
