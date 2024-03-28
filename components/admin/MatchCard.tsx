/**
 * @see https://v0.dev/t/LELX9dJqopb
 */
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  id: string;
  team1: string;
  team2: string;
  team1Score: number;
  team2Score: number;
  location: string;
  status: string;
  date: string;
  time: string;
}

export default function MatchCard({
  id,
  team1,
  team2,
  team1Score,
  team2Score,
  status,
  location,
  date,
  time,
}: Props) {
  return (
    <Card
      className={cn(
        status === "completed" ? "bg-green-50" : "",
        "w-full max-w-sm"
      )}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Add Logo Code Here */}
            <p className="font-semibold">{team1}</p>
          </div>
          <p className="text-3xl font-semibold">{team1Score}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">{team2}</p>
          </div>
          <p className="text-3xl font-semibold">{team2Score}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 grid gap-1.5">
        <p className="text-sm">
          <span className="font-semibold">Date: </span>
          {date}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Location: </span>
          {location}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Time: </span>
          {time}
        </p>
      </CardContent>
      {status !== "completed" && (
        <CardFooter className="p-4 flex justify-center gap-2">
          <Link href={"/admin/match/reschedule/" + id} className="w-full">
            <Button type="button" className="w-full" variant="outline">
              Re-schedule
            </Button>
          </Link>
          <Link href={"/admin/match/finish-match/" + id} className="w-full">
            <Button className="w-full">Finish Match</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

// Team Logo Code:
// <img
//   alt="Team logo"
//   className="rounded-full"
//   height="40"
//   src="/placeholder.svg"
//   style={{
//     aspectRatio: "40/40",
//     objectFit: "cover",
//   }}
//   width="40"
// />
