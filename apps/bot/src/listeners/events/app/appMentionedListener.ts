import {
  type EventLazyHandler,
  isPostedMessageEvent,
} from 'slack-cloudflare-workers';

const appMentionListener: EventLazyHandler<'app_mention'> = async ({
  context,
  body: { event },
}) => {
  if (!isPostedMessageEvent(event)) {
    return;
  }

  await context.say({
    thread_ts: event?.ts || context.threadTs,
    text: `:wave: <@${context.userId}> what's up?`,
    attachments: [{ title: 'Test', title_link: 'https://google.com' }],
  });
};

export default appMentionListener;
