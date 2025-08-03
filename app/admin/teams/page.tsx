import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import { Teams } from "@/model/Team";
import { getAllTeams } from "@/services/teams";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { Suspense } from "react";
import LoadingState from "../loading";
import TeamSearch from "@/components/admin/TeamSearch";

export const dynamic = "force-dynamic";

async function page() {
  const teams = JSON.parse(JSON.stringify(await getAllTeams())) as Teams[];

  const teamsWithPlayerCount = await Promise.all(
    teams.map(async (team) => {
      const players = await getAllPlayerDataFromTeamId(String(team._id));
      return {
        ...team,
        playerCount: players.length,
      };
    })
  );

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading
          heading="League Teams"
          isPrimaryButton={true}
          primaryButtonLink="/admin/teams/add-teams"
          primaryButtonText="Add teams"
        />
        {teams.length === 0 ? (
          <EmptyState
            text="No teams added, click here to add teams"
            link={"/admin/teams/add-teams"}
          />
        ) : (
          <TeamSearch initialTeams={JSON.parse(JSON.stringify(teamsWithPlayerCount))} />
        )}
      </Suspense>
    </>
  );
}

export default page;