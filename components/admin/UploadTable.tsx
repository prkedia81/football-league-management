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

interface Props {
  caption: string;
  headings: string[];
  data: any[]; // TODO: Fix
  cellNames: string[];
}

function UploadTable<T>({ caption, headings, data, cellNames }: Props) {
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
            {cellNames.map((cell, j) => (
              <TableCell key={j}>{row[cell]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UploadTable;
