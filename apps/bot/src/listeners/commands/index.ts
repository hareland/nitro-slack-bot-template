import type { SlackApp } from 'slack-cloudflare-workers';
import pingCommandListener from './pingCommandListener';
import whoAmIListener from './whoAmIListener';

const register = (app: SlackApp<Env>) => {
  app.command('/ping', pingCommandListener);
  app.command('/whoami', whoAmIListener);
  return app;
};

export default { register };
