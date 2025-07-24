import fs from 'node:fs/promises';
import yaml from 'yaml';

const file = await fs.readFile(
  new URL('../manifest.yaml', import.meta.url),
  'utf8',
);
const manifest = yaml.parse(file);

const userScopes = manifest?.oauth_config?.scopes?.user ?? [];
const botScopes = manifest?.oauth_config?.scopes?.bot ?? [];

console.log('User: ', userScopes.join(','));
console.log('Bot: ', botScopes.join(','));
