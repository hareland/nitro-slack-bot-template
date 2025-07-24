import { SlashCommandLazyHandler } from 'slack-cloudflare-workers';

const whoAmIListener: SlashCommandLazyHandler = async ({
  context,
  payload,
}) => {
  await context.respond({
    text: `userName=${payload.user_name},userId=${payload.user_id},teamDomain=${payload.team_domain},channelName=${payload.channel_name},enterpriseName=${payload.enterprise_name || 'n/a'}`,
  });
};

export default whoAmIListener;
