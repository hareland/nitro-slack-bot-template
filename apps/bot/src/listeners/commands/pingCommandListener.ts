import { SlashCommandLazyHandler } from 'slack-cloudflare-workers';

const pingCommandListener: SlashCommandLazyHandler = async ({
  context,
  payload,
}) => {
  await context.respond({
    thread_ts: context.threadTs,
    text: `Pong <@${context.userId}>! (${payload.team_domain}---${payload.text})`,
  });
};

export default pingCommandListener;
