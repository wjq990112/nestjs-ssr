import { createServer } from 'vite';
import { resolveClientPath } from './utils/resolve-path';

import type { ViteDevServer } from 'vite';

let viteDevServer: ViteDevServer;

/**
 * get vite server
 * @param opts options
 * @param opts.force create vite server forcibly
 * @returns instance of vite server
 */
export async function getViteServer({ force } = { force: false }) {
  if (!viteDevServer || force) {
    viteDevServer = await createServer({
      publicDir: resolveClientPath('public'),
      server: {
        middlewareMode: 'ssr',
      },
    });
  }

  return viteDevServer;
}
