import Custom404 from "@/app/admin/500";
import MatchDetailsPage from "@/components/matchDetails.tsx/MatchDetailsPage";
import { Matches } from "@/model/Match";
import { getMatchFromId } from "@/services/matches";

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

  return <MatchDetailsPage match={match} />;
}
