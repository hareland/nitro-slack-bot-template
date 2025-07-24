import { type EventLazyHandler } from 'slack-cloudflare-workers';
import { useLogger } from '../../utils/logger';
import { apiFetch } from '../../utils/request';

const appInstalledListener: EventLazyHandler<'app_installed'> = async ({
  context,
}) => {
  const logger = useLogger('events:app_installed');

  logger.info(`Received new installation for ${context.teamId}`);
  //
  // const { isEnterpriseInstall, enterpriseId, teamId } = context;
  const replyToUserId = context.userId || context.actorUserId;
  //
  // //
  // await apiFetch('/api/slack/install', {
  //   method: 'POST',
  //   body: {
  //     isEnterpriseInstall,
  //     enterpriseId,
  //     teamId,
  //     userId: replyToUserId,
  //   },
  // });

  //
  if (!replyToUserId) {
    logger.info(
      'Could not read which user installed the app - not following up.',
    );
    return;
  }

  //To not spam people, we DM the user that initiated the installation
  await context.client.chat.postMessage({
    channel: replyToUserId, //rfc: check if this is working...
    text: `Hi there <@${replyToUserId}>, you can add me to any channel, and in each channel i can manage multiple schedules for duties. Have fun! :tada:`,
  });

  //todo: add follow up actions that we can wait for? not sure how yet...
};

export default appInstalledListener;
