import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HomeLibraryServiceLogger } from './logger/logger.service';
import { writeLogsToFile } from './shared/lib';
import { LoggerLevels } from './shared/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);

  app.useLogger(new HomeLibraryServiceLogger());
  await app.listen(process.env.PORT || 4001);

  process.on('uncaughtException', (err) => {
    console.log(err);
    writeLogsToFile(
      LoggerLevels[LoggerLevels.error] as keyof typeof LoggerLevels,
      err.message,
    );
  });

  process.on('unhandledRejection', (err) => {
    console.log(err);
    writeLogsToFile(
      LoggerLevels[LoggerLevels.error] as keyof typeof LoggerLevels,
      `unhandledRejection: ${err}`,
    );
  });
}
bootstrap();
