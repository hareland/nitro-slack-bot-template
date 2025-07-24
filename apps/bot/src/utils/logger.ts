import { consola } from 'consola';
export const useLogger = (tag?: string) =>
  consola
    .create({
      defaults: {
        tag: 'SlackBot',
        type: 'info',
      },
    })
    .withTag(tag);
