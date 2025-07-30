import type { SlackApp } from 'slack-cloudflare-workers';
import sampleMessageListener from './sampleMessageListener';

const registerMessages = (app: SlackApp<Env>) => {
  app.message(/^(hi|hello|hey).*/, sampleMessageListener);
};

export default { register: registerMessages };
