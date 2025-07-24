import type { SlackApp } from 'slack-cloudflare-workers';
import pingCommandListener from './pingCommandListener';

const register = (app: SlackApp<Env>) => {
  app.command('/ping', pingCommandListener);
  return app;
};

export default { register };
