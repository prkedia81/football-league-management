'use client'
import Custom404 from "@/app/500";
import CancelModal from "@/components/CancelModal";
import PageHeading from "@/components/admin/Heading";
import NormalMatchForm from "@/components/admin/finishMatch/MultiForm";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Match, { Matches } from "@/model/Match";
import { Players } from "@/model/Player";
import { Teams } from "@/model/Team";
import { getMatchFromId } from "@/services/matches";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { getTeamFromId } from "@/services/teams";
import { ClockIcon, WifiIcon } from "@heroicons/react/24/outline";
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react"

interface Props {
  params: { matchId: string };
}


export default async function page({ params: { matchId } }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
     setShowModal(true);
  }
  console.log("HERE");
  const match: Matches = JSON.parse(
    JSON.stringify(await getMatchFromId(matchId))
  );
  console.log("Got Match");

  const team1Id = match?.team1?.teamId;
  const team2Id = match?.team2?.teamId;

  if (team1Id == undefined || team2Id == undefined) return <Custom404 />;

  const team1: Teams = JSON.parse(JSON.stringify(await getTeamFromId(team1Id)));
  const team2: Teams = JSON.parse(JSON.stringify(await getTeamFromId(team2Id)));

  return (
    <>
      <PageHeading heading={team1.name + " v/s " + team2.name} />
      <h1 className="mx-4 mt-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
        Choose the outcome of the match:
      </h1>
      <div className="flex flex-col gap-4 justify-center w-full p-4">
        <Link href={"/admin/match/normal-finish/" + matchId}>
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                {/* <CodeIcon className="h-6 w-6" /> */}
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
        <button onClick={handleOpenModal} className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3">
        <Card className="border border-gray-200">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              {/* <ClockIcon className="h-6 w-6" /> */}
              <div className="text-sm font-bold leading-none">
                Match Cancelled
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The match got cancelled with no winners or losers.
            </p>
          </CardContent>
        </Card>
        </button>
        {showModal && <CancelModal onClose={() => setShowModal(false)} />}
        <Card>
                    {/*TODO: Connect Cancel match to db*/} 
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              {/* <WifiIcon className="h-6 w-6" /> */}
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
      </div>
    </>
  );
}
