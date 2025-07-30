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
      block_id: 'select_channel_block_id',
      type: 'input',
      label: {
        type: 'plain_text',
        text: 'Select a channel to message the result to',
      },
      element: {
        type: 'conversations_select',
        action_id: 'sample_dropdown_id',
        response_url_enabled: true,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '📅 View Details',
            emoji: true,
          },
          action_id: 'modal_my_details', //defined in apps/bot/src/listeners/constants.ts
        },
        // {
        //   type: 'button',
        //   text: {
        //     type: 'plain_text',
        //     text: '🔄 Switch Duty',
        //     emoji: true,
        //   },
        //   action_id: 'switch_duty',
        // },
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
