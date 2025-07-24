import { getRedirect, shouldRedirect } from './utils/request';
import { createBotApp } from './bot';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const redirects = {
      //@ts-expect-error Adding this at a later point to the env.
      '/': env?.REDIRECT_HOME || 'https://hareland.eu',
    };

    //todo: check out H3/Hono and see if possible to mount the bot inside.
    if (shouldRedirect(request, redirects)) {
      return getRedirect(request, redirects);
    }

    const app = createBotApp(env);

    return await app.run(request, ctx);
  },
};
