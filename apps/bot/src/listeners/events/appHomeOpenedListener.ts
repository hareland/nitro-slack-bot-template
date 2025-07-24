import type {
  AnyHomeTabBlock,
  EventLazyHandler,
} from 'slack-cloudflare-workers';
import { apiFetch } from '../../utils/request';

const appHomeOpenedListener: EventLazyHandler<'app_home_opened'> = async ({
  context,
}) => {
  const blocks: AnyHomeTabBlock[] = [];

  //
  const apiBlocks = await apiFetch<AnyHomeTabBlock[]>(
    '/api/slack/blocks/app_home_opened',
    {
      method: 'POST',
      body: { userId: context.userId, channelId: context.channelId },
    },
  );

  // Could probably put this outside a try/catch and then finally, after the request.
  if (!apiBlocks || apiBlocks.length === 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Could not load home view for you, <@${context.userId}>... :cry:`,
      },
    });
  } else {
    blocks.push(...apiBlocks);
  }

  await context.client.views.publish({
    user_id: context.userId!,
    view: {
      type: 'home',
      blocks,
    },
  });
};

export default appHomeOpenedListener;
