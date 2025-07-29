import { z } from 'zod';
import { useValidatedBody, useValidatedParams } from 'h3-zod';
import renderAppHomeBlocks from '~/lib/slack/blocks/renderAppHomeBlocks';
import { NotFoundError } from '@nitrotool/errors';

const getBlocksForEventRouteSchema = z.object({
  eventName: z.enum(['app_home_opened']).or(z.string()),
});

const getBlocksContextSchema = z.object({
  userId: z.string().optional(),
  channelId: z.string().optional(),
});

export default defineBotEventHandler(async (event) => {
  const { eventName } = await useValidatedParams(
    event,
    getBlocksForEventRouteSchema,
  );

  const context = await useValidatedBody(event, getBlocksContextSchema);

  switch (eventName) {
    case 'app_home_opened':
      return renderAppHomeBlocks(context);

    default:
      throw NotFoundError(`No blocks available for "${eventName}".`);
  }
});
