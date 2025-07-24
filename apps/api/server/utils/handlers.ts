import type { EventHandler, EventHandlerRequest } from 'h3';
import { decodeJwtRaw, requireApiToken } from '@nitrotool/jwt';
import { UnauthorizedError } from '@nitrotool/errors';

export const defineBotEventHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    return handler(event);
    const apiToken = requireApiToken(event);

    const { slackSigningSecret } = useRuntimeConfig(event);
    const jwt = await decodeJwtRaw<{
      type: string | 'slack-bot'; // this should be slack-bot...
    }>(apiToken, slackSigningSecret);

    if (jwt.exp && jwt.exp <= Date.now() / 1000) {
      import.meta.dev && console.debug('Token has expired.');
      throw UnauthorizedError();
    }

    import.meta.dev && console.debug(`API token type: ${jwt.type}`);

    return handler(event);
  });
