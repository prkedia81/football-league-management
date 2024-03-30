import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import PlayerTable from "@/components/admin/PlayerTable";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { getTeamFromId, getTeamPlayersFromId } from "@/services/teams";

interface Props {
  params: { teamId: string };
}

export default async function page({ params: { teamId } }: Props) {
  const team = await getTeamFromId(teamId);
  const playerList = await getAllPlayerDataFromTeamId(teamId);

  return (
    <>
      <PageHeading
        heading={team.name + " - " + "Player List"}
        isPrimaryButton={true}
        primaryButtonLink={
          "/admin/teams/manage-players/" + teamId + "/add-players"
        }
        primaryButtonText="Add Players"
      />
      {playerList.length === 0 && (
        <EmptyState
          text="No players added, click here to add players"
          link={"/admin/teams/manage-players/" + teamId + "/add-players"}
        />
      )}
      {playerList.length !== 0 && (
        <PlayerTable
          data={playerList}
          caption={"Table of players in " + team.name}
        />
      )}
    </>
  );
}
