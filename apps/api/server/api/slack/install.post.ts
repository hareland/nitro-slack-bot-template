import { z } from 'zod';
import { useValidatedBody } from 'h3-zod';
import fetchTeamInfo from '~/lib/slack/actions/team/fetchTeamInfo';

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

  return { message: 'Workspace created.' };
});
