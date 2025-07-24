import type { SlackApp } from 'slack-cloudflare-workers';
import sampleMessageListener from './sampleMessageListener';

const register = (app: SlackApp<Env>) => {
  app.message(/^(hi|hello|hey).*/, sampleMessageListener);
};

export default { register };
