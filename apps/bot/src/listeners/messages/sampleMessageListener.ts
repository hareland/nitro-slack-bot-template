import { MessageEventLazyHandler } from 'slack-cloudflare-workers';
import { useLogger } from '../../utils/logger';
import { messageIsFromThread } from '../../utils/message';

const sampleMessageListener: MessageEventLazyHandler = async ({
  context,
  body,
  payload,
}) => {
  const logger = useLogger();

  const isFromThread = messageIsFromThread(payload);

  const append = isFromThread ? ' - THREAD' : '';

  if (context.channelId.startsWith('D')) {
    //is direct message
    await context.say({
      text: `You said "${payload.text}" in a DM, channelId=${context.channelId}.${append}`,
    });
    return;
  }

  //todo: how to see if a message is a "root" or "thread" message?
  logger.info(payload);
  context.authorizeResult.team;
  await context.say({
    text: `${payload.text} there yourself!${append}`,
    thread_ts: payload.thread_ts || payload.event_ts,
  });
};

export default sampleMessageListener;
