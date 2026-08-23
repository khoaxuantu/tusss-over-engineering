import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import "dotenv/config";
import qs from "qs";
import { AppModule } from "./app.module";
import { createOpenApi } from "./openapi";

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
    routerOptions: {
      querystringParser: (str) => qs.parse(str),
    },
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
  createOpenApi(app);

  await app.listen(process.env.PORT ?? 5000);
}

// eslint-disable-next-line
bootstrap();
