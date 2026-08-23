import { ConfigLoaderDirector, ConfigLoaderPool, EnvironmentType, IConfigLoader } from "@tusss/ood";
import { defaultConfig } from "./default";
import { Config } from "./types";

class LoaderDev implements IConfigLoader<Config> {
  load: () => Promise<Config> = async () => {
    return new Promise<Config>((res) =>
      res({
        environment: "development",
        ...defaultConfig(),
      }),
    );
  };
}

class LoaderProd implements IConfigLoader<Config> {
  load: () => Promise<Config> = async () => {
    return new Promise<Config>((res) =>
      res({
        environment: "production",
        ...defaultConfig(),
      }),
    );
  };
}

class LoaderTest implements IConfigLoader<Config> {
  load: () => Promise<Config> = async () => {
    return new Promise<Config>((res) =>
      res({
        environment: "test",
        ...defaultConfig(),
      }),
    );
  };
}

class ConfigPool extends ConfigLoaderPool<EnvironmentType, Config> {
  override defaultLoader: IConfigLoader<Config> = new LoaderDev();
}

const pool = new ConfigPool([
  ["production", new LoaderProd()],
  ["test", new LoaderTest()],
]);

const ConfigLoader = new ConfigLoaderDirector(pool);

export default ConfigLoader;
