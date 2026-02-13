import { eq } from 'drizzle-orm';
import { AnyMessageBlock } from 'slack-cloudflare-workers';

type AdminContext = {
  userId: string;
  teamId: string;
};

type BotAdminDomainActions = {
  users: BotAdminUserActions;
};

type BotAdminUserActions = 'list';

export const botAdmin = async <Domain extends keyof BotAdminDomainActions>(
  domain: Domain,
  action: BotAdminDomainActions[Domain],
  context: AdminContext,
) => {
  switch (domain) {
    case 'users':
      return botAdminUsers(action, context);
    default:
      throw new Error('Not implemented yet.');
  }
};

const botAdminUsers = async (
  action: BotAdminUserActions,
  context: AdminContext,
) => {
  switch (action) {
    case 'list':
      const workspaceUsers = await useDrizzle().query.workspaces.findFirst({
        where: () => eq(tables.workspaces.id, context.teamId),
        with: {
          usersInWorkspace: {
            with: {
              user: true,
            },
          },
        },
      });

      if (!workspaceUsers) {
        return simpleMarkdownBlock('No workspace found for this team :/');
      }

      const mdUserList = workspaceUsers.usersInWorkspace
        .map(({ user }) => {
          return `<@${user.id}>`;
        })
        .join(',\n');

      return {
        blocks: <AnyMessageBlock[]>[
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Hi there <@${context.userId}>, here's the list of users in this workspace:\n${mdUserList}\n\n That is a total of ${workspaceUsers.usersInWorkspace.length}`,
            },
          },
        ],
      };

    default:
      throw new Error('Not implemented yet.');
  }
};

const simpleMarkdownBlock = (text: string) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
        },
      },
    ],
  };
};
