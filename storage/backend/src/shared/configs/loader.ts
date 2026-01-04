import { defaultConfig } from "./default";
import { Config } from "./types";

const localConfig: Config = {
  environment: "development",
  ...defaultConfig,
};

const prodConfig: Config = {
  environment: "production",
  ...defaultConfig,
};

const testConfig: Config = {
  environment: "test",
  ...defaultConfig,
};

export default function loadConfig() {
  const env = process.env.NODE_ENV;

  switch (env) {
    case "development":
      return localConfig;

    case "production":
      return prodConfig;

    case "test":
      return testConfig;

    default:
      return localConfig;
  }
}
