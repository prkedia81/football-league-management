import Custom404 from "@/app/(home)/500";
import LoadingState from "@/app/loading";
import PageHeading from "@/components/admin/Heading";
import WalkoverForm from "@/components/admin/finishMatch/walkover/WalkoverMultiForm";
import { Matches } from "@/model/Match";
import { Teams } from "@/model/Team";
import { getMatchFromId } from "@/services/matches";
import { getTeamFromId } from "@/services/teams";
import { Suspense } from "react";

interface Props {
  params: { matchId: string };
}

export default async function page({ params: { matchId } }: Props) {
  const match: Matches = JSON.parse(
    JSON.stringify(await getMatchFromId(matchId))
  );

  const team1Id = match?.team1?.teamId;
  const team2Id = match?.team2?.teamId;

  if (team1Id == undefined || team2Id == undefined) return <Custom404 />;

  const team1: Teams = JSON.parse(JSON.stringify(await getTeamFromId(team1Id)));
  const team2: Teams = JSON.parse(JSON.stringify(await getTeamFromId(team2Id)));

  const props = {
    match: match,
    team1: team1,
    team2: team2,
  };

  return (
    <>
      <PageHeading heading={team1.name + " v/s " + team2.name} />
      <Suspense fallback={<LoadingState />}>
        <WalkoverForm {...props} />
      </Suspense>
    </>
  );
}
