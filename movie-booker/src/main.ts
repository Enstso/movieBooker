import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation des endpoints de l’API')
    .setVersion('1.0')
    .addBearerAuth({in:'header',type:'http'}) // Si vous utilisez l'authentification JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Documentation accessible via /api
  // Enable CORS with custom options
  app.enableCors({
    origin: [process.env.URL_FRONT], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
