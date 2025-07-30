import { $fetch } from 'ofetch';
import { encodeJwtRaw } from '@nitrotool/jwt';
import { env } from 'cloudflare:workers';
import type {
  AnyHomeTabBlock,
  AnyMessageBlock,
  Block,
} from 'slack-cloudflare-workers';
import type { SupportedEventType } from 'slack-edge';

export const apiFetch = $fetch.create({
  baseURL: env.API_URL || 'http://localhost:3001',
  async onRequest(ctx) {
    ctx.options.headers.set(
      'Authorization',
      `Bearer ${await encodeJwtRaw({ type: 'slack-bot', sub: '1' }, env.SLACK_SIGNING_SECRET)}`,
    );
  },
});

export const fetchBlocksForEvent = async <B extends Block = AnyHomeTabBlock>(
  eventName: SupportedEventType,
  context: {
    userId?: string;
    teamId?: string;
    channelId?: string;
  },
) => {
  return await apiFetch<B[]>(`/api/slack/blocks/${eventName}`, {
    method: 'POST',
    body: {
      userId: context.userId,
      teamId: context.teamId,
      channelId: context.channelId,
    },
  });
};

export const forwardEventToApi = async (
  eventName: SupportedEventType,
  context: { userId?: string; teamId?: string },
  payload: any,
) => {
  await apiFetch(`/api/slack/events/${eventName}`, {
    method: 'POST',
    body: {
      userId: context.userId,
      teamId: context.teamId,
      payload,
    },
  });
};

export const forwardCommandToApi = async (
  {
    command,
    domain,
    action,
    params,
  }: {
    command: string;
    domain: string;
    action: string;
    params: string[];
  },
  context: { userId?: string; teamId?: string },
) => {
  const commandEscaped = command.replaceAll('/', '');
  try {
    return {
      data: await apiFetch(`/api/slack/commands/${commandEscaped}`, {
        method: 'POST',
        body: {
          command,
          commandEscaped,
          domain,
          action,
          params,
          context,
        },
      }),
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};
