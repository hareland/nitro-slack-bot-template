import { MessageEventLazyHandler } from 'slack-cloudflare-workers';
import { useLogger } from '../../utils/logger';

const sampleMessageListener: MessageEventLazyHandler = async ({ context }) => {
  const logger = useLogger();
  await context.say({
    text: 'Sample message',
  });
  logger.info('Replied to "Sample message".');
};

export default sampleMessageListener;
