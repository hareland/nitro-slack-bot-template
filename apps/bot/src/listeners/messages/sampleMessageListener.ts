import type { MessageEventLazyHandler } from 'slack-cloudflare-workers';
import { useLogger } from '../../utils/logger';
import {
  messageIsDirectMessage,
  messageIsFromThread,
} from '../../utils/message';

const sampleMessageListener: MessageEventLazyHandler = async ({
  context,
  body,
  payload,
}) => {
  const logger = useLogger('messages:sampleMessage');

  const isFromThread = messageIsFromThread(payload);
  const isDM = messageIsDirectMessage(payload);

  const message = `Message originates from channelId=${context.channelId} delivered in ${isFromThread ? 'thread' : 'root'}${isDM ? ' and is a DM' : ''}.`;

  logger.info(message);

  if (isDM) {
    await context.say({ text: message });
    return;
  }

  await context.say({
    text: `${payload.text} there yourself!`,
    thread_ts: payload.thread_ts || payload.event_ts,
  });
};

export default sampleMessageListener;
