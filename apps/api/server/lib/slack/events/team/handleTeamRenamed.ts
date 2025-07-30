import { UnprocessableEntityError } from '@nitrotool/errors';
import { eq } from 'drizzle-orm';

const handleTeamRenamed = async (
  ctx: { teamId?: string },
  payload: { name: string },
) => {
  if (!ctx.teamId) {
    throw UnprocessableEntityError(
      'Cannot process team rename without a team ID.',
    );
  }

  await useDrizzle()
    .update(tables.workspaces)
    .set({
      name: payload.name,
    })
    .where(eq(tables.workspaces.id, ctx.teamId));
};

export default handleTeamRenamed;
