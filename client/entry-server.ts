import { createApp } from './main';
import { renderToString } from 'vue/server-renderer';

export async function render(url: string) {
  const { app, router } = createApp();

  router.push(url);
  await router.isReady();

  const template = await renderToString(app);

  return { template };
}
