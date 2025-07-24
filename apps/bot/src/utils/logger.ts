import { consola } from 'consola';

export const useLogger = (tag?: string) => {
  const instance = consola.create({
    defaults: {
      tag: 'SlackBot',
      type: 'info',
    },
  });

  if (!tag) {
    return instance;
  }

  return instance.withTag(tag);
};
