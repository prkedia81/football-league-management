import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  _id?: string;
  name: string;
  matchesPlayed?: string[];
  playerList?: string[];
  teamCode: string;
}

function TeamCard(props: Props) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-4">
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid gap-1.5">
        <p className="text-sm">
          <span className="font-semibold">Team Code: </span>
          {props.teamCode}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Matches Played: </span>
          {props.matchesPlayed ? props.matchesPlayed.length : 0}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Number of Players: </span>
          {props.playerList ? props.playerList.length : 0}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex justify-center gap-2">
        {/* TODO: EDIT or Delete Team: Name, email, reg num etc  */}
        {/* <Link href={"/admin/team/edit/" + props.id} className="w-full">
          <Button type="button" className="w-full" variant="outline">
            Edit Team
          </Button>
        </Link> */}
        <div className="flex flex-row  gap-2">
          <Link
            href={"/admin/teams/manage-players/" + props._id}
            className="w-full">
            <Button variant="outline" className="w-full">
              Manage Players
            </Button>
          </Link>

          <Link
            href={"/admin/teams/manage-officials/" + props._id}
            className="w-full">
            <Button variant="outline" className="w-full">
              Manage Officials
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TeamCard;
