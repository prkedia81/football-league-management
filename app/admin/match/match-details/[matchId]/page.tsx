import Custom404 from "@/app/admin/500";
import LoadingState from "@/app/loading";
import PageHeading from "@/components/admin/Heading";
import MatchDetailsPage from "@/components/matchDetails.tsx/MatchDetailsPage";
import { Matches } from "@/model/Match";
import { getMatchFromId } from "@/services/matches";
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

  return (
    <>
      <PageHeading
        heading={match.team1.teamName + " v/s " + match.team2.teamName}
      />
      <Suspense fallback={<LoadingState />}>
        <MatchDetailsPage match={match} />
      </Suspense>
    </>
  );
}
