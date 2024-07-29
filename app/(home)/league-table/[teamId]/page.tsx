import LoadingState from "@/app/loading";
import PageHeading from "@/components/admin/Heading";
import { Teams } from "@/model/Team";
import { getTeamFromId } from "@/services/teams";
import React, { Suspense } from "react";
import Custom404 from "../../500";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Matches } from "@/model/Match";
import { getSingleTeamMatch } from "@/services/matches";
import EmptyState from "@/components/admin/EmptyState";
import DisplayMatchesComponent from "@/components/admin/DisplayMatchesComponent";
import PlayerTable from "@/components/admin/PlayerTable";
import { getAllPlayerDataFromTeamId } from "@/services/players";

interface Props {
  params: { teamId: string };
}

async function page({ params: { teamId } }: Props) {
  const teamPromise = getTeamFromId(teamId);
  const matchesPromise = getSingleTeamMatch(teamId);
  const playersPromise = getAllPlayerDataFromTeamId(teamId);

  let [team, matches, players] = await Promise.all([
    teamPromise,
    matchesPromise,
    playersPromise,
  ]);

  team = JSON.parse(JSON.stringify(team));
  matches = JSON.parse(JSON.stringify(matches));
  players = JSON.parse(JSON.stringify(players));

  if (!team) return <Custom404 />;

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading heading={team.name} />
        <Suspense fallback={<LoadingState />}>
          <div>
            <Tabs defaultValue="matchList" className="w-full">
              <div className="w-full flex flex-row items-center justify-center">
                <TabsList className="bg-gray-100 w-full rounded-none py-6">
                  <TabsTrigger className="w-full" value="matchList">
                    Match List
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="playerList">
                    Player List
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="matchList">
                {matches === null && <p>No matches added</p>}
                {matches !== null && (
                  <DisplayMatchesComponent matches={matches} isAdmin={false} />
                )}
              </TabsContent>
              <TabsContent value="playerList">
                <PlayerTable
                  teamName={team.name}
                  caption="List of players in the team"
                  data={players}
                />
              </TabsContent>
            </Tabs>
          </div>
        </Suspense>
      </Suspense>
    </>
  );
}

export default page;
