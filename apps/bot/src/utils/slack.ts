import {
  defaultOpenIDConnectCallback,
  KVInstallationStore,
  KVStateStore,
  SlackOAuthApp,
} from 'slack-cloudflare-workers';
import { useLogger } from './logger';
import { apiFetch } from './request';

export const createSlackApp = (env: Env) => {
  const logger = useLogger('slack-app');
  return new SlackOAuthApp({
    env: env,
    installationStore: new KVInstallationStore(env, env.SLACK_INSTALLATIONS),
    stateStore: new KVStateStore(env.SLACK_OAUTH_STATES),
    oidc: {
      callback: defaultOpenIDConnectCallback,
    },
    oauth: {
      //TODO: Might want to check if they can install it?
      // async beforeInstallation({ request }) {
      //   logger.info('before-install-', request);
      // },
      async afterInstallation({ installation }) {
        //So that we can let our API know this workspace exist.
        await apiFetch('/api/slack/install', {
          method: 'POST',
          body: {
            isEnterpriseInstall: installation.is_enterprise_install || false,
            enterpriseId: installation.enterprise_id,
            teamId: installation.team_id,
            userId: installation.user_id,
          },
        });

        logger.info('Created installation on API.');
      },
    },
  });
};
