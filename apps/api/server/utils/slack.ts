import { WebClient } from '@slack/web-api';

export const useSlackAsBot = () => {
  const {
    slack: { botToken },
  } = useRuntimeConfig(useEvent());

  return new WebClient(botToken);
};
