import Custom404 from "@/app/(home)/500";
import LoadingState from "@/app/loading";
import CancelMatchComponent from "@/components/admin/finishMatch/CancelMatchComponent";
import PageHeading from "@/components/admin/Heading";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Matches } from "@/model/Match";
import { getMatchFromId } from "@/services/matches";
import Link from "next/link";
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
      <Suspense fallback={<LoadingState />}>
        <PageHeading
          heading={match.team1.teamName + " v/s " + match.team2.teamName}
        />
      </Suspense>
      <h1 className="mx-4 mt-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
        Choose the outcome of the match:
      </h1>
      <div className="flex flex-col gap-4 justify-center w-full p-4">
        <Link href={"/admin/match/normal-finish/" + matchId}>
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold leading-none">
                  Normal Match
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The match ended without any hiccups
              </p>
            </CardContent>
          </Card>
        </Link>
        <CancelMatchComponent matchId={matchId} />
        <Link href={"/admin/match/walkover/" + matchId}>
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold leading-none">
                  Match Walk-over
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                There was a walkover with one team winning
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}
