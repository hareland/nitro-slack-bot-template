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

    const requestUrl = new URL(request.url);
    const requestPath = requestUrl.pathname;

    //todo: check out H3/Hono and see if possible to mount the bot inside.
    //@ts-expect-error Adding this at a later point to the env.
    if (env?.REDIRECT_HOME && redirects[requestPath]) {
      return Response.redirect(redirects[requestPath]);
    }

    const app = createBotApp(env);

    return await app.run(request, ctx);
  },
};
