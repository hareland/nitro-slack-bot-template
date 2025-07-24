import { z } from 'zod';
import { useValidatedBody } from 'h3-zod';

const installSchema = z.object({
  isEnterpriseInstall: z.boolean(),
  enterpriseId: z.string().optional().nullable(),
  teamId: z.string(),
  userId: z.string(),
});

export default defineBotEventHandler(async (event) => {
  const { isEnterpriseInstall, enterpriseId, teamId, userId } =
    await useValidatedBody(event, installSchema);

  await useDrizzle()
    .insert(tables.workspaces)
    .values({
      id: teamId,
      //todo: import the name somehow?
      name: 'unsupported',
      enterpriseId: isEnterpriseInstall ? enterpriseId : null,
      installedBy: userId,
    })
    .onConflictDoNothing();

  return { message: 'Workspace created.' };
});
