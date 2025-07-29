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
    channelId?: string;
  },
) => {
  return await apiFetch<B[]>(`/api/slack/blocks/${eventName}`, {
    method: 'POST',
    body: context,
  });
};

export const requestToUrl = (request: Request) => new URL(request.url);

export const shouldRedirect = (
  request: Request,
  redirects: Record<string, string>,
) => {
  return typeof redirects[requestToUrl(request).pathname] !== 'undefined';
};

export const getRedirect = (
  request: Request,
  redirects: Record<string, string>,
) => Response.redirect(redirects[requestToUrl(request).pathname]);
