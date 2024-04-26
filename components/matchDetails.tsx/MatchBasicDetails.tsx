import { dateFormat, timeFormat } from "@/lib/utils";
import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";

interface Props {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  time: number;
  venueName: string;
}

function MatchBasicDetails({ ...props }: Props) {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Add Logo Code Here */}
            <p className="font-semibold">{props.team1Name}</p>
          </div>
          <p className="text-3xl font-semibold">{props.team1Score}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">{props.team2Name}</p>
          </div>
          <p className="text-3xl font-semibold">{props.team2Score}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 grid gap-1.5">
        <p className="text-sm">
          <span className="font-semibold">Date: </span>
          {dateFormat(props.time)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Venue: </span>
          {props.venueName}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Time: </span>
          {timeFormat(props.time)}
        </p>
      </CardContent>
    </Card>
  );
}

export default MatchBasicDetails;
