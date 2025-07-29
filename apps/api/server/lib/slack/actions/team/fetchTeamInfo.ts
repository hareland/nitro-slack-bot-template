import { useSlackAsBot } from '~/utils/slack';

const fetchTeamInfo = async (teamId: string) => {
  const client = useSlackAsBot();

  const { team, error } = await client.team.info({ team: teamId });

  if (error) {
    throw new Error(error);
  }

  return {
    id: team.id,
    name: team.name,
  };
};

export default fetchTeamInfo;
