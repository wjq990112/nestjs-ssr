import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { getViteServer } from './get-vite-server';
import { isProduction } from './utils/env';
import { resolveDistPath } from './utils/resolve-path';

import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (isProduction) {
    app.useStaticAssets(resolveDistPath('client'), {
      index: false,
    });
    app.use(compression());
  } else {
    const vite = await getViteServer();
    app.use(vite.middlewares);
  }

  await app.listen(3000);
}

bootstrap();
