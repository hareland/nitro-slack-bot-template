import 'dotenv/config';
import fs from 'node:fs/promises';
import yaml from 'yaml';

const pkgString = await fs.readFile(
  new URL('../package.json', import.meta.url),
  'utf8',
);

function parseArgs(argv) {
  const args = {};

  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;

    const [key, ...rest] = arg.slice(2).split('=');
    const value = rest.join('=');

    switch (key) {
      case 'api-base':
        args.apiBase = value;
        break;
      case 'bot-name':
        args.botName = value;
        break;
      case 'bot-display-name':
        args.botDisplayName = value;
        break;
    }
  }

  return args;
}

const parsedArgv = parseArgs(process.argv.slice(2));

const { name } = JSON.parse(pkgString);

const botName =
  parsedArgv.botName || process.env.BOT_NAME || name || 'Slack Bot';

const botDisplayName =
  parsedArgv.botDisplayName || process.env.BOT_DISPLAY_NAME || botName;

const apiBase =
  parsedArgv.apiBase || process.env.API_URL || 'http://localhost:3000';
const eventsApi = `${apiBase}/slack/events`;

const yamlString = yaml.stringify({
  display_information: {
    name: botName,
  },
  features: {
    app_home: {
      home_tab_enabled: true,
      messages_tab_enabled: true,
      messages_tab_read_only_enabled: true,
    },
    bot_user: {
      display_name: botDisplayName,
      always_online: true,
    },
    //TODO: Scan the commands folder?
    slash_commands: [
      {
        command: '/ping',
        url: eventsApi,
        description: 'Ping',
        should_escape: true,
      },
      {
        command: '/whoami',
        url: eventsApi,
        description: 'Who am I?',
        should_escape: true,
      },
      {
        command: '/bot-admin',
        url: eventsApi,
        description: 'Admin commands',
        usage_hint: '[users] [list|import] [?: @user]',
        should_escape: true,
      },
    ],
  },
  oauth_config: {
    redirect_urls: [`${apiBase}/slack/oauth_redirect`],
    scopes: {
      user: process.env.SLACK_USER_SCOPES
        ? process.env.SLACK_USER_SCOPES.split(',')
        : ['team:read', 'usergroups:read'],
      bot: process.env.SLACK_BOT_SCOPES
        ? process.env.SLACK_BOT_SCOPES.split(',')
        : [
            'app_mentions:read',
            'chat:write',
            'chat:write.public',
            'groups:history',
            'channels:history',
            'channels:join',
            'im:history',
            'im:read',
            'im:write',
            'reactions:read',
            'reactions:write',
            'commands',
            'users:read',
            'usergroups:read',
            'team:read',
          ],
    },
  },
  settings: {
    event_subscriptions: {
      request_url: eventsApi,
      bot_events: process.env.SLACK_BOT_EVENTS
        ? process.env.SLACK_BOT_EVENTS.split(',')
        : [
            'app_home_opened',
            'app_mention',
            'app_uninstalled',
            'message.channels',
            'message.groups',
            'message.im',
            'reaction_added',
            'subteam_members_changed',
            'team_rename',
          ],
    },
    interactivity: {
      is_enabled: true,
      request_url: eventsApi,
    },
    org_deploy_enabled: false,
    socket_mode_enabled: false,
    token_rotation_enabled: false,
  },
});

console.log(yamlString);
