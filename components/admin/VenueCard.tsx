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
  regId?: string;
  matchesPlayed?: string[];
  matchesScheduled?: string[];
}

function VenueCard(props: Props) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-4">
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid gap-1.5">
        <p className="text-sm">
          <span className="font-semibold">Venue Reg Id: </span>
          {props.regId}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Matches Scheduled: </span>
          {props.matchesScheduled ? props.matchesScheduled.length : 0}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Matches Played: </span>
          {props.matchesPlayed ? props.matchesPlayed.length : 0}
        </p>
        {/* TODO: EDIT or Delete Team: Name, email, reg num etc  */}
        {/* <CardFooter className="p-4 flex justify-center gap-2">
        <Link
          href={"/admin/team/manage-players/" + props._id}
          className="w-full">
          <Button variant="outline" className="w-full">
            Manage Venue
          </Button>
        </Link>
      </CardFooter> */}
      </CardContent>
    </Card>
  );
}

export default VenueCard;
