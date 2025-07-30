import type { SlackApp } from 'slack-cloudflare-workers';

import appHomeOpenedListener from './appHomeOpenedListener';
import appMentionListener from './appMentionedListener';

const register = (app: SlackApp<Env>) => {
  app.event('app_home_opened', appHomeOpenedListener);
  app.event('app_mention', appMentionListener);
};

export default { register };
