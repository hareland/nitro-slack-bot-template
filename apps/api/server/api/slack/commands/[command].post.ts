import { z } from 'zod';
import { useValidatedBody, useValidatedParams } from 'h3-zod';
import { NotFoundError } from '@nitrotool/errors';
import { useLogger } from '~/utils/logger';

const routeSchema = z.object({
  command: z.string(),
});

const commandSchema = z.object({
  command: z.string(),
  commandEscaped: z.string().optional(),
  domain: z.enum(['users']).or(z.string()),
  action: z.enum(['list']).or(z.string()),
  params: z.array(z.string()).optional().default([]),
  context: z.object({
    userId: z.string().optional(),
    teamId: z.string().optional(),
  }),
});

export default defineBotEventHandler(async (event) => {
  const { command } = await useValidatedParams(event, routeSchema);
  const payload = await useValidatedBody(event, commandSchema);

  const logger = useLogger('api:slack:commands');
  logger.log({ command, payload });

  switch (payload.command) {
    case '/bot-admin':
      return {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*👋 Hello there from the API <@${payload.context.userId}>!*`,
            },
          },
        ],
      };

    default:
      throw NotFoundError();
  }
});
