import type { AnyHomeTabBlock } from 'slack-cloudflare-workers';
import { BlockRenderer } from '~/lib/slack/blocks/types';

type HomeContext = {
  userId?: string;
};

export const renderAppHomeBlocks: BlockRenderer<
  AnyHomeTabBlock,
  HomeContext
> = async (context) => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*👋 Welcome to your workspace assistant <@${context.userId}>!*`,
      },
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Header',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Choose an action below:',
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '📅 View Schedule',
            emoji: true,
          },
          action_id: 'view_schedule',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '🔄 Switch Duty',
            emoji: true,
          },
          action_id: 'switch_duty',
        },
      ],
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'Tip: You can always use `/whoami` to see some details.',
        },
      ],
    },
  ];
};

export default renderAppHomeBlocks;
