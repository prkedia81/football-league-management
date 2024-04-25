import Custom404 from "@/app/admin/500";
import PageHeading from "@/components/admin/Heading";
import RescheduleMatch from "@/components/admin/finishMatch/RescheduleMatch";
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

  // Add a form and get match data in a pre-filled form
  // Have date picker and time picker in the form
  // Add a validation on the venue, do check -> In venue, at the date is there any other match
  // QUESTION: What about a match in the morning and one match in the evening
  // OR Overlap in the 90 minutes

  return (
    <>
      <PageHeading
        heading={match.team1.teamName + " v/s " + match.team2.teamName}
      />
      <RescheduleMatch match={match} />
    </>
  );
}
