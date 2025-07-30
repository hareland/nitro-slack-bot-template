const fetchUserInfo = async (userId: string) => {
  const client = useSlackAsBot();

  const { user, error } = await client.users.info({ user: userId });

  if (error) {
    throw new Error(error);
  }

  return {
    id: user.id,
    name: user.name,
    isAdmin: user.is_admin,
    isOwner: user.is_owner,
    isDeleted: user.deleted,
    isBot: user.is_bot,
  };
};

export default fetchUserInfo;
