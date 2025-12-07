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
    get: operations["CityController_filter"];
    put?: never;
    post: operations["CityController_create"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/cities/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["CityController_getOne"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/districts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["DistrictController_filter"];
    put?: never;
    post: operations["DistrictController_create"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/districts/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["DistrictController_getOne"];
    put?: never;
    post?: never;
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
    CityResponse: {
      id: string;
      name: string;
    };
    FilterString: {
      /** @description Equal */
      eq?: string;
      /** @description Not Equal */
      ne?: string;
      /** @description In an array */
      in?: string[];
      /** @description Not in an array */
      nin?: string[];
      /** @description Contains */
      contain?: string;
    };
    CityFilterField: {
      id?: components["schemas"]["FilterString"];
      name?: components["schemas"]["FilterString"];
    };
    PaginationResponse: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
      next_page?: number;
      prev_page?: number;
    };
    CityFilterResponse: {
      data: components["schemas"]["CityResponse"][];
      pagination: components["schemas"]["PaginationResponse"];
    };
    DistrictCreateRequest: {
      /**
       * @description District ID
       * @example 1
       */
      id: string;
      /**
       * @description District name
       * @example District 1
       */
      name: string;
    };
    DistrictResponse: {
      id: string;
      name: string;
    };
    DistrictFilterField: {
      id?: components["schemas"]["FilterString"];
      name?: components["schemas"]["FilterString"];
    };
    DistrictFilterResponse: {
      data: components["schemas"]["DistrictResponse"][];
      pagination: components["schemas"]["PaginationResponse"];
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
  CityController_filter: {
    parameters: {
      query: {
        /** @description The current page */
        page?: number;
        /** @description The number of items per page */
        perPage?: number;
        /** @description Sorts */
        sorts: {
          /** @enum {string} */
          field: "name";
          /** @enum {string} */
          direction: "asc" | "desc";
        }[];
        and: components["schemas"]["CityFilterField"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CityFilterResponse"];
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
  CityController_getOne: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CityResponse"];
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
      /** @description Not Found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /**
             * @example Not found
             * @enum {string}
             */
            message: "errors.not_found";
            /** @example Not Found */
            error: string;
            /** @example 404 */
            statusCode: number;
          };
        };
      };
    };
  };
  DistrictController_filter: {
    parameters: {
      query: {
        /** @description The current page */
        page?: number;
        /** @description The number of items per page */
        perPage?: number;
        /** @description Sorts */
        sorts: {
          /** @enum {string} */
          field: "name";
          /** @enum {string} */
          direction: "asc" | "desc";
        }[];
        and: components["schemas"]["DistrictFilterField"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DistrictFilterResponse"];
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
    };
  };
  DistrictController_create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["DistrictCreateRequest"];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @enum {string} */
            message: "ok.create";
          };
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
  DistrictController_getOne: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DistrictResponse"];
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
      /** @description Not Found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /**
             * @example Not found
             * @enum {string}
             */
            message: "errors.not_found";
            /** @example Not Found */
            error: string;
            /** @example 404 */
            statusCode: number;
          };
        };
      };
    };
  };
}
