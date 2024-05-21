import { cn, dateFormat, timeFormat } from "@/lib/utils";

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

export default function MatchSheet({
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

  return (
    <div className="w-[95%] mx-3 my-3 py-1 rounded-lg border text-card-foreground shadow-sm bg-gray-300">
      <div className="flex flex-col items-start justify-between h-full p-4">
        {status === "completed" && (
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              {/* Add Logo Code Here */}
              <p className="font-semibold">{team1Name}</p>
            </div>
            <p className="text-3xl font-semibold">
              {team1Score} - {team2Score}
            </p>
            {/* <p className="text-3xl font-semibold"></p> */}
            <div className="flex items-center space-x-2">
              <p className="font-semibold">{team2Name}</p>
            </div>
          </div>
        )}
        {status !== "completed" && (
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              {/* Add Logo Code Here */}
              <p className="font-semibold">{team1Name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-semibold">{team2Name}</p>
            </div>
          </div>
        )}
        <div className="grid gap-1.5">
          <p className="text-sm">
            <span>Date: </span>
            {dateFormat(time)}
          </p>
          <p className="text-sm">
            <span>Venue: </span>
            {venueName}
          </p>
          <p className="text-sm">
            <span>Time: </span>
            {timeFormat(time)}
          </p>
        </div>
      </div>
    </div>
  );
}
