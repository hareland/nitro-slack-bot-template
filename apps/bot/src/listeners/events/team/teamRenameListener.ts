import { EventLazyHandler } from 'slack-cloudflare-workers';
import { forwardEventToApi } from '../../../utils/request';

const teamRenameListener: EventLazyHandler<'team_rename'> = async ({
  context,
  payload,
}) => {
  await forwardEventToApi('team_rename', context, payload);
};

export default teamRenameListener;
