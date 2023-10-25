import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import passport  from 'passport';
import { redisSession } from './config/session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: (reqOrigin, callback) => {
        callback(null, reqOrigin)
      },
    },
  })

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;


  app.use(redisSession);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
