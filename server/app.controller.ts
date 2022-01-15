import { readdirSync, readFileSync } from 'fs';
import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { getViteServer } from './get-vite-server';
import { isProduction } from './utils/env';
import { resolveClientPath, resolveDistPath } from './utils/resolve-path';

import type { Request } from 'express';
import type { ViteDevServer } from 'vite';

const TEMPLATE_PLACEHOLDER = '<!-- template-placeholder -->';

const ROUTES_PATH = readdirSync(resolveClientPath('pages'), {
  encoding: 'utf-8',
})
  .filter((path) => /\.vue$/.test(path))
  .map((path) => {
    const name = path.match(/(.*)\.vue$/)[1].toLowerCase();
    const routePath = `/${name}`;
    if (routePath === '/home') {
      return '/';
    }
    return routePath;
  });

@Controller(ROUTES_PATH)
export class AppController {
  constructor() {}

  @Get()
  @Header('Content-Type', 'text/html')
  async renderApp(@Req() request: Request): Promise<string> {
    const url = request.originalUrl;
    let vite: ViteDevServer;
    let html: string;
    let render: (url: string) => Promise<{ template: string }>;

    try {
      if (isProduction) {
        html = readFileSync(resolveDistPath('client', 'index.html'), {
          encoding: 'utf-8',
        });
        render = (await import(resolveDistPath('server', 'entry-server.js')))
          .render;
      } else {
        vite = await getViteServer();
        html = await vite.transformIndexHtml(
          url,
          readFileSync(resolveClientPath('index.html'), {
            encoding: 'utf-8',
          }),
        );
        render = (
          await vite.ssrLoadModule(resolveClientPath('entry-server.ts'))
        ).render;
      }

      const { template } = await render(url);
      return html.replace(TEMPLATE_PLACEHOLDER, template);
    } catch (error) {
      vite && vite.ssrFixStacktrace(error);
      throw new InternalServerErrorException(error);
    }
  }
}
