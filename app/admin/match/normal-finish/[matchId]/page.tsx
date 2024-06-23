import Custom404 from "@/app/(home)/500";
import LoadingState from "@/app/loading";
import PageHeading from "@/components/admin/Heading";
import NormalMatchForm from "@/components/admin/finishMatch/normalMatch/NormalMatchForm";
import { getMatchFromId } from "@/services/matches";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { getTeamFromId } from "@/services/teams";
import { Suspense } from "react";

interface Props {
  params: { matchId: string };
}

export default async function page({ params: { matchId } }: Props) {
  let match = await getMatchFromId(matchId);

  if (!match.team1 || !match.team2) {
    return <Custom404 />;
  }

  // Extract team IDs
  const {
    team1: { teamId: team1Id },
    team2: { teamId: team2Id },
  } = match;

  // Fetch teams and players in parallel using Promise.all
  let [team1, team2, team1Players, team2Players] = await Promise.all([
    getTeamFromId(team1Id || ""),
    getTeamFromId(team2Id || ""),
    getAllPlayerDataFromTeamId(team1Id || ""),
    getAllPlayerDataFromTeamId(team2Id || ""),
  ]);

  match = JSON.parse(JSON.stringify(match));
  team1 = JSON.parse(JSON.stringify(team1));
  team2 = JSON.parse(JSON.stringify(team2));
  team1Players = JSON.parse(JSON.stringify(team1Players));
  team2Players = JSON.parse(JSON.stringify(team2Players));

  if (team1 === null || team2 === null) return <Custom404 />;

  const props = {
    match: match,
    team1Players: team1Players,
    team1: team1,
    team2Players: team2Players,
    team2: team2,
  };

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading heading={team1.name + " v/s " + team2.name} />
      </Suspense>
      <Suspense fallback={<LoadingState />}>
        <NormalMatchForm {...props} />
        {/* <MultiFormSkeleton
          zodSchema={NormalMatchFormSchema}
          steps={steps}
          submitApiEndpoint="/api/admin/normal-match"
          match={match}
        /> */}
      </Suspense>
    </>
  );
}
