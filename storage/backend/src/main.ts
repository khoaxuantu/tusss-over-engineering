import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import "dotenv/config";
import { AppModule } from "./app.module";

function setupOpenApi(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle("Tusss Storage")
    .setDescription("The Tusss Storage (or Inventory) API descriptions.")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

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
}

function setupFunctional(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );
}

async function bootstrap() {
  const environment = process.env.NODE_ENV ?? "development";
  const fastify = new FastifyAdapter({
    logger:
      environment == "development"
        ? {
            transport: {
              target: "pino-pretty",
              options: {
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
                hideObject: true,
                messageFormat:
                  "{if reqId}[{reqId}]{end} {if req.url}[{req.method}][{req.url}]{end} {if responseTime}[{res.statusCode}][{responseTime}ms]{end} {msg}",
              },
            },
          }
        : false,
  });

  const app = await NestFactory.create(AppModule, fastify);

  setupFunctional(app);
  setupOpenApi(app);

  await app.listen(process.env.PORT ?? 5000);
}

// eslint-disable-next-line
bootstrap();
