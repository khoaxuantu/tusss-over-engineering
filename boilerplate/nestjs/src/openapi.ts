import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function createOpenApi(app: INestApplication) {
  createMainDocument(app);
  createEventDocument(app);
  createAdminDocument(app);
  createJsonForFrontend(app);
  createJsonForMobile(app);
}

function createMainDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Backend API")
    .setVersion("1.0")
    .setExternalDoc("Event APIs", "/apis/events")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      syntaxHighlight: {
        theme: "nord",
      },
    },
  });

  SwaggerModule.setup("apis", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      syntaxHighlight: {
        theme: "nord",
      },
    },
  });

  return document;
}

function createEventDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Event APIs")
    .setExternalDoc("Sign in", "/apis#/Auth")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup("apis/events", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      syntaxHighlight: {
        theme: "nord",
      },
    },
  });

  return document;
}

function createAdminDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Admin APIs")
    .setExternalDoc("Sign in", "/apis#/Auth")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup("apis/admins", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      syntaxHighlight: {
        theme: "nord",
      },
    },
  });
}

function createJsonForFrontend(app: INestApplication) {
  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup("apis/frontend", app, document, {
    jsonDocumentUrl: "/generators/ptn-clients/frontend",
    swaggerUiEnabled: false,
    raw: true,
  });

  return document;
}

function createJsonForMobile(app: INestApplication) {
  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup("apis/mobile", app, document, {
    jsonDocumentUrl: "/generators/ptn-clients/mobile",
    swaggerUiEnabled: false,
    raw: true,
  });

  return document;
}
