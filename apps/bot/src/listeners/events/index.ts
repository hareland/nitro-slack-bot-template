import { SlackApp } from 'slack-cloudflare-workers';
import appEvents from './app';
import teamEvents from './team';

const registerEvents = (app: SlackApp<Env>) => {
  appEvents.register(app);
  teamEvents.register(app);
};

export default { register: registerEvents };
