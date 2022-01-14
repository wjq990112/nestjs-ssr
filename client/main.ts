import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import { createPinia } from './stores';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createPinia();
  app.use(router);
  app.use(store);
  return { app, router, store };
}
