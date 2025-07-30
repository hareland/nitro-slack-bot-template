import type { SlackApp } from 'slack-cloudflare-workers';
import actions from './actions';
import commands from './commands';
import events from './events';
import messages from './messages';

export const registerListeners = (app: SlackApp<Env>) => {
  actions.register(app);
  commands.register(app);
  events.register(app);
  messages.register(app);

  return app;
};
