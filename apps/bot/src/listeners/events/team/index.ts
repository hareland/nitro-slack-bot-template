import teamRenameListener from './teamRenameListener';
import type { SlackApp } from 'slack-cloudflare-workers';

const register = (app: SlackApp<Env>) => {
  app.event('team_rename', teamRenameListener);
};
export default { register };
