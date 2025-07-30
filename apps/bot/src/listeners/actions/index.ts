import type { SlackApp } from 'slack-cloudflare-workers';
import { MODAL_MY_DETAILS_ID } from '../constants';
import myDetailsModalListener from './myDetailsModalListener';

const noopActionHandler = async () => {};

const registerActions = (app: SlackApp<Env>) => {
  app.action(MODAL_MY_DETAILS_ID, noopActionHandler, myDetailsModalListener);
};

export default { register: registerActions };
