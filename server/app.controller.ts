import { readFileSync } from 'fs';
import { Controller, Get, Header, Req } from '@nestjs/common';
import { getViteServer } from './get-vite-server';
import { resolveClientPath } from './utils/resolve-path';

import type { Request } from 'express';

const TEMPLATE_PLACEHOLDER = '<!-- template-placeholder -->';

@Controller('*')
export class AppController {
  constructor() {}

  @Get()
  @Header('Content-Type', 'text/html')
  async renderApp(@Req() request: Request): Promise<string> {
    const url = request.originalUrl;
    const vite = await getViteServer();
    const html = await vite.transformIndexHtml(
      url,
      readFileSync(resolveClientPath('index.html'), {
        encoding: 'utf-8',
      }),
    );
    const { render } = await vite.ssrLoadModule(
      resolveClientPath('entry-server.ts'),
    );
    const { template } = await render(url);
    return html.replace(TEMPLATE_PLACEHOLDER, template);
  }
}
