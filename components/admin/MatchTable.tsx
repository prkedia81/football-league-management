import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Matches } from "@/model/Match";
import { dateFormat, timeFormat } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { editPenaltyStatuses } from "./MatchCard";

interface Props {
  data: Matches[];
  isActions?: boolean;
}

function MatchTable({ data, isActions = true }: Props) {
  let headings: string[] = [];

  if (isActions) {
    headings = ["Sr Num", "Teams", "Score", "Date", "Time", "Venue", "Actions"];
  } else {
    headings = ["Sr Num", "Teams", "Score", "Date", "Time", "Venue"];
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headings.map((heading, i) => (
            <TableHead key={i} className="w-[100px]">
              {heading}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="w-1 p-1.5">{i + 1}</TableCell>
            <TableCell className="p-1.5">
              <div className="flex flex-col gap-0.5">
                <span>{row.team1.teamName}</span>
                <span>{row.team2.teamName}</span>
              </div>
            </TableCell>
            <TableCell className="p-1.5">
              <div className="flex flex-col gap-0.5">
                <span>{row.team1Score}</span>
                <span>{row.team2Score}</span>
              </div>
            </TableCell>
            <TableCell className="p-1.5">{dateFormat(row.time)}</TableCell>
            <TableCell className="p-1.5">{timeFormat(row.time)}</TableCell>
            <TableCell className="p-1.5">{row.venue.venueName}</TableCell>
            {isActions && (
              <TableCell className="p-1.5 flex flex-col gap-1">
                {row.status === "unplayed" ? (
                  <>
                    <Link
                      href={"/admin/match/reschedule/" + row._id}
                      className="w-full">
                      <Button
                        size="sm"
                        type="button"
                        className="w-full"
                        variant="outline">
                        Re-schedule
                      </Button>
                    </Link>
                    <Link
                      href={"/admin/match/finish-match/" + row._id}
                      className="w-full">
                      <Button size="sm" className="w-full">
                        Finish Match
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {editPenaltyStatuses.includes(status) && (
                      <Link
                        href={"/admin/match/edit-penalty/" + row._id}
                        className="w-full">
                        <Button size="sm" variant="ghost" className="w-full">
                          Edit Penalty
                        </Button>
                      </Link>
                    )}
                    <Link
                      href={"/admin/match/match-details/" + row._id}
                      className="w-full">
                      <Button size="sm" className="w-full">
                        View Match Details
                      </Button>
                    </Link>
                  </>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MatchTable;
