import nitroCloudflareBindings from 'nitro-cloudflare-dev';
//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-07-21',
  runtimeConfig: {
    jwtSecret: 'some-very-secret-string-longer-than-32-chars',
    slackSigningSecret: 'secret',
  },
  experimental: {
    asyncContext: true,
  },
  modules: [nitroCloudflareBindings],
  // storage: {
  //   notificationRoutes: {
  //     driver: 'cloudflare-kv-binding',
  //     binding: 'NOTIFICATION_ROUTES',
  //   },
  // },
  unenv: {
    //required for async context in CF
    external: ['node:async_hooks'],
  },
});
