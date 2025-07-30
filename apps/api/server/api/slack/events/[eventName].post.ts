import { z } from 'zod';
import type { SupportedEventType } from 'slack-cloudflare-workers';
import { useValidatedBody, useValidatedParams } from 'h3-zod';
import { NotFoundError } from '@nitrotool/errors';
import handleTeamRenamed from '~/lib/slack/events/team/handleTeamRenamed';

const routeSchema = z.object({
  eventName: z.enum(<SupportedEventType[]>['team_rename']).or(z.string()),
});

const ingressSchema = z.object({
  userId: z.string().optional(),
  teamId: z.string().optional(),
  payload: z.any(),
});

const handled = () => ({ message: 'ok' });

export default defineBotEventHandler(async (event) => {
  const { eventName } = await useValidatedParams(event, routeSchema);
  const { userId, teamId, payload } = await useValidatedBody(
    event,
    ingressSchema,
  );

  switch (eventName) {
    case 'team_rename':
      await handleTeamRenamed({ teamId }, payload);
      return handled();

    default:
      throw NotFoundError();
  }
});
