import { z } from 'zod';
import { useValidatedBody } from 'h3-zod';
import fetchTeamInfo from '~/lib/slack/actions/team/fetchTeamInfo';
import fetchUserInfo from '~/lib/slack/actions/user/fetchUserInfo';

const installSchema = z.object({
  isEnterpriseInstall: z.boolean(),
  enterpriseId: z.string().optional().nullable(),
  teamId: z.string(),
  userId: z.string(),
});

export default defineBotEventHandler(async (event) => {
  const { isEnterpriseInstall, enterpriseId, teamId, userId } =
    await useValidatedBody(event, installSchema);

  const { name } = await fetchTeamInfo(teamId);

  await useDrizzle()
    .insert(tables.workspaces)
    .values({
      id: teamId,
      name,
      enterpriseId: isEnterpriseInstall ? enterpriseId : null,
      installedBy: userId,
    })
    .onConflictDoNothing();

  if (userId) {
    const user = await fetchUserInfo(userId);
    await useDrizzle()
      .insert(tables.users)
      .values({
        id: user.id,
      })
      .onConflictDoNothing();

    await useDrizzle()
      .insert(tables.usersToWorkspaces)
      .values({
        userId: user.id,
        workspaceId: teamId,
        roles: [
          user.isAdmin ? 'admin' : false,
          user.isOwner ? 'owner' : false,
        ].filter(Boolean),
      })
      .onConflictDoNothing();
  }

  return { message: 'Workspace created.' };
});
