import Custom404 from "@/app/admin/500";
import LoadingState from "@/app/loading";
import PageHeading from "@/components/admin/Heading";
import RescheduleMatch, {
  RescheduleMatchInputs,
} from "@/components/admin/finishMatch/RescheduleMatch";
import { Matches } from "@/model/Match";
import { rescheduleEmail } from "@/services/emailService";
import { getMatchFromId, rescheduleMatch } from "@/services/matches";
import { checkSchedulingConflict, getAllVenues } from "@/services/venues";
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

  const allVenue = JSON.parse(JSON.stringify(await getAllVenues()));

  if (team1Id == undefined || team2Id == undefined) return <Custom404 />;

  async function checkConflict(time: number, venueId: string) {
    "use server";
    const resp = await checkSchedulingConflict(venueId, time);
    return resp;
  }

  async function rescheduleFn(matchId: string, venueId: string, time: number) {
    "use server";
    // TODO: Edit Venue also!
    const resp = await rescheduleMatch(matchId, venueId, time);
    return resp;
  }

  async function rescheduleEmailFn(matchId: string) {
    "use server";
    const email = await rescheduleEmail(match._id);
    // return email;
  }

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading
          heading={match.team1.teamName + " v/s " + match.team2.teamName}
        />
      </Suspense>
      <Suspense fallback={<LoadingState />}>
        <RescheduleMatch
          match={match}
          checkConflict={checkConflict}
          rescheduleFn={rescheduleFn}
          venues={allVenue}
          rescheduleEmailFn={rescheduleEmailFn}
        />
      </Suspense>
    </>
  );
}
