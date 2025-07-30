import type { SlackApp } from 'slack-cloudflare-workers';
import pingCommandListener from './pingCommandListener';
import whoAmIListener from './whoAmIListener';
import adminCommands from './admin';

const registerCommands = (app: SlackApp<Env>) => {
  app.command('/ping', pingCommandListener);
  app.command('/whoami', whoAmIListener);
  adminCommands.register(app);
};

export default { register: registerCommands };
