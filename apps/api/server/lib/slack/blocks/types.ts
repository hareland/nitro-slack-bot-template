import { AnyHomeTabBlock, Block } from 'slack-cloudflare-workers';

export type BlockRenderer<
  B extends Block = AnyHomeTabBlock,
  Ctx = { userId?: string },
> = (ctx: Ctx) => Promise<B[]>;
