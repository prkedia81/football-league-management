import { getLeagueTable } from "@/services/leagueTable";
import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Link from "next/link";

async function LeagueTable() {
  const leagueTable = await getLeagueTable();
  const headings = [
    "Sr Num",
    "Club",
    "MP",
    "W",
    "D",
    "L",
    "GF",
    "GA",
    "GD",
    "Points",
  ];

  return (
    <Table>
      <TableCaption>The League Table</TableCaption>
      <TableHeader>
        <TableRow>
          {headings.map((heading, i) => (
            <TableHead
              key={i}
              className={heading == "Club" ? "w-[400px]" : "w-[100px]"}>
              {heading}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {leagueTable.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="p-2 pl-4">{i + 1}</TableCell>
            <TableCell className="p-2 text-left">
              <Link
                href={"/admin/league/" + row.id}
                className="hover:underline">
                {row.name}
              </Link>
            </TableCell>
            <TableCell className="p-2">{row.mp}</TableCell>
            <TableCell className="p-2">{row.w}</TableCell>
            <TableCell className="p-2">{row.d}</TableCell>
            <TableCell className="p-2">{row.l}</TableCell>
            <TableCell className="p-2">{row.gf}</TableCell>
            <TableCell className="p-2">{row.ga}</TableCell>
            <TableCell className="p-2">{row.gd}</TableCell>
            <TableCell className="p-2">{row.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LeagueTable;
