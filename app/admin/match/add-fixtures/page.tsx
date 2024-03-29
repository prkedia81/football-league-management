"use client";

import AddTeam from "@/components/admin/addTeam";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

interface MatchFixtureUpload {
  srNum: number;
  team1Id: string;
  team2Id: string;
  date: string;
  time: string;
  location: string;
}

const page = () => {
  const [data, setData] = useState<MatchFixtureUpload[]>([]);
  const [headings, setHeadings] = useState<string[]>([]);
  const cellNames = ["srNum", "team1Id", "team2Id", "date", "time", "location"];

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const ws = workbook.Sheets[worksheetName];
      const sheetData = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        raw: false,
        dateNF: "yyyy-mm-dd",
      });
      // TODO: Check Type Safety here
      const tableHeadings = sheetData.shift() as string[];
      setHeadings(tableHeadings);
      const tableData: MatchFixtureUpload[] = [];
      sheetData.forEach((row) => {
        if (Array.isArray(row) && row?.length == 6)
          tableData.push({
            srNum: row[0],
            team1Id: row[1],
            team2Id: row[2],
            date: row[3],
            time: row[4],
            location: row[5],
          });
      });
      setData(tableData);
    };
    reader.readAsBinaryString(file);
  };

  const handleFixtureUpload = (data: MatchFixtureUpload[]) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <div className="mx-4 w-[95%] my-4 relative group border border-dashed border-gray-300 rounded-lg p-6 items-center justify-center flex text-sm text-gray-700 dark:text-gray-400">
          Upload file
          <input
            className="absolute inset-0 z-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            accept=".xls, .xlsx"
            onChange={handleFileUpload}
          />
        </div>
        <br/>OR
        <AddTeam />
        {/* TODO: OR Single Entry Form here*/}
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
              {/* TODO: Need to Fix this */}
              {cellNames.map((cell, j) => (
                <TableCell key={j}>{row[cell]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="default" onClick={() => handleFixtureUpload(data)}>
        Upload Match Fixtures
      </Button>
    </>
  );
};

// interface Props {
//   text: string;
//   onChangeFn: (event: ChangeEvent<HTMLInputElement>) => void;
//   fileType: string;
// }

// function UploadZone({ text, fileType, onChangeFn }: Props) {
//   return (
//     <div className="flex flex-col w-full gap-2">
//       <div className="mx-4 w-[95%] my-4 relative group border border-dashed border-gray-300 rounded-lg p-6 items-center justify-center flex text-sm text-gray-700 dark:text-gray-400">
//         {text}
//         <input
//           className="absolute inset-0 z-0 w-full h-full opacity-0 cursor-pointer"
//           type="file"
//           accept={fileType}
//           onChange={onChangeFn}
//         />
//       </div>
//     </div>
//   );
// }

export default page;
