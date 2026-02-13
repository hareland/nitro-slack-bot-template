# nitro-slack-bot-template

Batteries included slack bot template.
> **NOTE**: This is generally for internal use, you gotta be a bit savvy to use this since i am too lazy to document this one.

## Apps
- [`apps/api`](./apps/api) - Handle state++ for the bot.
- [`apps/bot`](./apps/bot) - The bot itself - can forward events to the api (which is optional, probably gotta edit out those listeners)

## Methods of building
1. Entire repo: `npx giget@latest gh:hareland/nitro-slack-bot-template`
2. API Only: `npx giget@latest gh:hareland/nitro-slack-bot-template/app/api`
2. Bot Only: `npx giget@latest gh:hareland/nitro-slack-bot-template/app/bot`


## Goal
To have a simple starter kit for building complex slack bots.


## Tech
- [nitro](https://nitro.build)
- [h3](https://h3.dev)
- [drizzle](https://drizzle.team)
- [slack-edge](https://github.com/slack-edge)
- [wrangler/cloudflare](https://developers.cloudflare.com/workers/wrangler/)
