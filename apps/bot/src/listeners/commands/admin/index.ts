import { AnyMessageBlock, Block, SlackApp } from 'slack-cloudflare-workers';
import { useLogger } from '../../../utils/logger';
import { forwardCommandToApi } from '../../../utils/request';

const parseCommand = (command: string) => {
  const [domain, action, ...params] = command.split(' ');

  return { domain, action, params };
};

const registerAdminCommands = (app: SlackApp<Env>) => {
  app.command('/bot-admin', async ({ context, payload }) => {
    const logger = useLogger('commands:admin');
    const { domain, action, params } = parseCommand(payload.text);
    logger.info(
      `Received admin command: ${domain} ${action} ${params.join(' ')}`,
    );

    const { data, error } = await forwardCommandToApi(
      {
        command: payload.command,
        domain,
        action,
        params,
      },
      context,
    );

    if (error) {
      await context.respond({
        text: `Error: ${error.message}`,
      });
      return;
    }

    if (!data) {
      await context.respond({
        text: `No data returned.`,
      });
      return;
    }

    if (data.blocks && Array.isArray(data.blocks)) {
      await context.respond({
        text: 'Response from API :interrobang:',
        blocks: data.blocks as AnyMessageBlock[],
      });

      return;
    }

    await context.respond({
      text:
        data ||
        `Command "${payload.command}:${domain}.${action} => ${params.join(', ')}" received.`,
    });
  });
};

export default { register: registerAdminCommands };
