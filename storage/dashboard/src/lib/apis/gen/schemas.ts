export interface paths {
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["AppController_getHello"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_login"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/token/refresh": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["AuthController_refresh"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/cities": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations["CityController_create"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    SignInRequest: {
      username: string;
      password: string;
    };
    /** @enum {string} */
    Role: "ADMIN" | "EDITOR" | "VIEWER";
    UserIdentifier: {
      id: number;
      name: string;
      roles: components["schemas"]["Role"][];
    };
    SignInResponse: {
      session: components["schemas"]["UserIdentifier"];
      access_token: string;
      refresh_token: string;
    };
    RefreshTokenRequest: {
      refresh_token: string;
    };
    RefreshTokenResponse: {
      access_token: string;
      refresh_token: string;
    };
    CityCreateRequest: {
      id: string;
      name: string;
    };
    CityCreateResponse: {
      new_id: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  AppController_getHello: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description When user is not logged in */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example Unauthorized */
            message: string;
            /** @example 401 */
            statusCode: number;
          };
        };
      };
    };
  };
  AuthController_login: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignInRequest"];
      };
    };
    responses: {
      default: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SignInResponse"];
        };
      };
    };
  };
  AuthController_refresh: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RefreshTokenRequest"];
      };
    };
    responses: {
      default: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["RefreshTokenResponse"];
        };
      };
    };
  };
  CityController_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CityCreateRequest"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CityCreateResponse"];
        };
      };
      /** @description When user is not logged in */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example Unauthorized */
            message: string;
            /** @example 401 */
            statusCode: number;
          };
        };
      };
      /** @description If the input payload contains a duplicate id, then this error should be returned */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /**
             * @example errors.duplicated
             * @enum {string}
             */
            message: "errors.duplicated" | "errors.db";
            /** @default Conflict */
            error: string;
            /** @default 409 */
            statusCode: number;
          };
        };
      };
      /** @description Internal Server Error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /**
             * @example Internal Server Error
             * @enum {string}
             */
            message: "errors.create";
            /** @default 500 */
            statusCode: number;
          };
        };
      };
    };
  };
}
