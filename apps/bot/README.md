# nitro-slack-bot

Handles the main interactions with Slack

## Useful files/directories

- [`src/listeners/`](./src/listeners) - Listeners for actions inside slack
- [`.env.example](./.env.example) - Example env :)

## Commands

### Generate manifest

> Defaults are read from .env (see [scrips/generateManifestYaml.mjs](./scripts/generateManifestYaml.mjs))

```bash
pnpm --silent build-manifest \
  --api-base="https://some-tunnel.trycloudflare.com"\
  --bot-name="ExampleBot"\
  --bot-display-name="BotDisplayName"\
> manifest.example.yaml
```