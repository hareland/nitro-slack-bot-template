import type { BlockActionLazyHandler } from 'slack-cloudflare-workers';

const myDetailsModalListener: BlockActionLazyHandler<'button'> = async ({
  context,
  payload,
}) => {
  await context.client.views.open({
    trigger_id: payload.trigger_id,
    view: {
      type: 'modal',
      // callback_id: payload.i,
      title: {
        type: 'plain_text',
        text: `Details for ${context.actorUserId}`,
      },
      notify_on_close: false,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi there <@${context.actorUserId}>, from inside a modal :smile:`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              `*User ID:* ${context.actorUserId}`,
              `*Team ID:* ${context.teamId}`,
              `*Channel ID:* ${context.channelId}`,
              `*Trigger ID:* ${payload.trigger_id}`,
              '',
              '```',
              JSON.stringify(payload.team, null, 2),
              '```',
            ].join('\n'),
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: ':smile: refresh - not',
                emoji: true,
              },
            },
          ],
        },
      ],
    },
  });
};

export default myDetailsModalListener;
