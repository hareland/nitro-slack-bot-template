# nitro-slack-bot

Handles the main interactions with Slack

## Useful files/directories

- [`src/listeners/`](./src/listeners) - Listeners for actions inside slack
- [`.env.example](./.env.example) - Example env :)

## Commands

### Generate manifest

> Defaults are read from .env (see [scrips/generateManifestYaml.mjs](./scripts/generateManifestYaml.mjs))


### Totally basic:
```bash
pnpm --silent build-manifest > manifest.yaml
```

### With overrides:
```bash
pnpm --silent build-manifest \
  --api-base="https://some-tunnel.trycloudflare.com"\
  --bot-name="ExampleBot"\
  --bot-display-name="BotDisplayName"\
> manifest.yaml
```


## Comments
Please see [package.json](./package.json) and the "Useful files/directories" section for details.