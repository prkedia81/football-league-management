import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, dateFormat, timeFormat } from "@/lib/utils";
import Link from "next/link";

export interface Props {
  _id?: string;
  team1: { teamCode: string; teamId?: string; teamName?: string };
  team2: { teamCode: string; teamId?: string; teamName?: string };
  team1Score: number;
  team2Score: number;
  venue: { venueRegId: string; venueName?: string };
  status: string;
  time: number;
}

export default function MatchCard({
  _id,
  team1,
  team2,
  team1Score,
  team2Score,
  status,
  venue,
  time,
}: Props) {
  const team1Name = team1.teamName ? team1.teamName : "Team " + team1.teamCode;
  const team2Name = team2.teamName ? team2.teamName : "Team " + team2.teamCode;

  let venueName = "";
  if (venue.venueName) {
    venueName = venue.venueName;
  } else {
    venueName = venue.venueRegId;
  }

  // status => unplayed, completed, unruly, noShow, informed, othersWalkover, cancelled
  const classStatus = [
    {
      status: "unplayed",
      class: "",
    },
    {
      status: "completed",
      class: "bg-green-100 bg-opacity-50 border-2 border-green-500",
    },
    {
      status: "unruly",
      class: "bg-red-100 bg-opacity-50 border-2 border-red-500",
    },
    {
      status: "informed",
      class: "bg-indigo-100 bg-opacity-50 border-2 border-indigo-500",
    },
    {
      status: "noShow",
      class: "bg-red-100 bg-opacity-50 border-2 border-red-500",
    },
    {
      status: "othersWalkover",
      class: "bg-indigo-100 bg-opacity-50 border-2 border-indigo-500",
    },
    {
      status: "cancelled",
      class: "bg-indigo-100 bg-opacity-50 border-2 border-indigo-500",
    },
  ];

  const cardClass =
    classStatus.filter((item) => item.status === status)[0]?.class || "";

  return (
    <Card className={cn(cardClass, "w-full max-w-80")}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Add Logo Code Here */}
            <p className="font-semibold">{team1Name}</p>
          </div>
          <p className="text-3xl font-semibold">{team1Score}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">{team2Name}</p>
          </div>
          <p className="text-3xl font-semibold">{team2Score}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 grid gap-1.5">
        <p className="text-sm">
          <span className="font-semibold">Date: </span>
          {dateFormat(time)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Venue: </span>
          {venueName}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Time: </span>
          {timeFormat(time)}
        </p>
      </CardContent>
      {status === "unplayed" ? (
        <CardFooter className="p-4 flex justify-center gap-2">
          <Link href={"/admin/match/reschedule/" + _id} className="w-full">
            <Button type="button" className="w-full" variant="outline">
              Re-schedule
            </Button>
          </Link>
          <Link href={"/admin/match/finish-match/" + _id} className="w-full">
            <Button className="w-full">Finish Match</Button>
          </Link>
        </CardFooter>
      ) : (
        <CardFooter className="p-4 flex justify-center gap-2">
          <Link href={"/admin/match/match-details/" + _id} className="w-full">
            <Button className="w-full">View Match Details</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
