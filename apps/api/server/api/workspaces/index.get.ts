export default defineEventHandler(async () => {
  return useDrizzle().query.workspaces.findMany({
    with: {
      usersInWorkspace: {
        with: {
          user: true,
        },
      },
    },
  });
});
