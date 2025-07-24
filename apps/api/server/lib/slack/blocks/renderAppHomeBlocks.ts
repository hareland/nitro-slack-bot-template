export const renderAppHomeBlocks = () => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*👋 Welcome to your workspace assistant!*',
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
        text: 'Tip: You can always use `/duty` to view your upcoming shifts.',
      },
    ],
  },
];

export default renderAppHomeBlocks;
