export interface CommonConfig {
  db: {
    name: string;
    host: string;
    user: string;
    password: string;
    port: number;
  };
  auth: {
    secret: {
      default: string;
    };
    jwt_expiry: {
      login: string;
      refresh: string;
    };
  };
}

export interface Config extends CommonConfig {
  environment: "development" | "production" | "test";
}
