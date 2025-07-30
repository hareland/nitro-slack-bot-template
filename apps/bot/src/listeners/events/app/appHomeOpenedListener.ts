import type {
  AnyHomeTabBlock,
  EventLazyHandler,
} from 'slack-cloudflare-workers';
import { fetchBlocksForEvent } from '../../../utils/request';

const eventName = 'app_home_opened';

const appHomeOpenedListener: EventLazyHandler<typeof eventName> = async ({
  context,
  payload,
}) => {
  if (payload.tab === 'messages') {
    await context.say({
      text: 'Hi there! You can see the panel from the "Home" tab.',
    });
    return;
  }

  //
  const blocks: AnyHomeTabBlock[] = [];
  const homeBlocks = await fetchBlocksForEvent(eventName, context);

  // Could probably put this outside a try/catch and then finally, after the request.
  if (!homeBlocks || homeBlocks.length === 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Could not load home view for you, <@${context.userId}>... :cry:`,
      },
    });
  } else {
    blocks.push(...homeBlocks);
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
