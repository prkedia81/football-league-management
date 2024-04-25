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

interface Props {
  caption: string;
  data: Players[];
}

function PlayerTable({ caption, data }: Props) {
  const headings = [
    "Sr Num",
    "Name",
    "Registration ID",
    "Goals",
    "Yellow Cards",
    "Red Cards",
  ];
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
            <TableCell>{row.regId}</TableCell>
            <TableCell>{row.goals.length}</TableCell>
            <TableCell>{row.yellowCards.length}</TableCell>
            <TableCell>{row.redCards.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PlayerTable;
