import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getViteServer } from './get-vite-server';

import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const vite = await getViteServer();
  app.use(vite.middlewares);
  await app.listen(3000);
}
bootstrap();
