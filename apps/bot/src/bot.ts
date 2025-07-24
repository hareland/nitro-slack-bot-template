import { createSlackApp } from './utils/slack';
import { registerListeners } from './listeners';

export const createBotApp = (env: Env) => {
  const app = createSlackApp(env);

  registerListeners(app);

  return app;
};
