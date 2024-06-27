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
import { Players } from "@/model/Player";
import { Officials } from "@/model/Official";

interface Props {
  caption: string;
  data: Players[] | Officials[];
  isOfficials?: boolean;
}

function PlayerTable({ caption, data, isOfficials = false }: Props) {
  // type guard functions - Typesafety work around
  function tsIsOfficial(row: Players | Officials): row is Officials {
    return (row as Officials).position !== undefined;
  }

  function tsIsPlayer(row: Players | Officials): row is Players {
    return (row as Players).goals !== undefined;
  }

  let headings: string[] = [];

  if (!isOfficials) {
    headings = [
      "Sr Num",
      "Name",
      "Registration ID",
      "Matches Played",
      "Goals",
      "Yellow Cards",
      "Red Cards",
    ];
  } else {
    headings = ["Sr Num", "Name", "Position", "Yellow Cards", "Red Cards"];
  }

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
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
            <TableCell>{i + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            {tsIsOfficial(row) ? (
              <TableCell>{row.position}</TableCell>
            ) : (
              <TableCell>{row.regId}</TableCell>
            )}
            {tsIsPlayer(row) && (
              <TableCell>{row.matchesPlayed.length}</TableCell>
            )}
            {tsIsPlayer(row) && <TableCell>{row.goals.length}</TableCell>}
            <TableCell>{row.yellowCards.length}</TableCell>
            <TableCell>{row.redCards.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PlayerTable;
