import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
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
  const app = await NestFactory.create(AppModule);

  setupFunctional(app);
  setupOpenApi(app);

  await app.listen(process.env.PORT ?? 5000);
}

// eslint-disable-next-line
bootstrap();
