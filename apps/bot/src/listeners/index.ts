import type { SlackApp } from 'slack-cloudflare-workers';
import commands from './commands';
import events from './events';
import messages from './messages';

export const registerListeners = (app: SlackApp<Env>) => {
  commands.register(app);
  events.register(app);
  messages.register(app);

  return app;
};
