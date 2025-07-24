import renderAppHomeBlocks from '~/lib/slack/blocks/renderAppHomeBlocks';

export default defineBotEventHandler(async () => {
  //TODO: Add information to the blocks from the DB.
  return renderAppHomeBlocks();
});
