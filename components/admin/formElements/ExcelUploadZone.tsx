import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface Props {
  setHeadings: (item: string[]) => void;
  setData: (item: any[]) => void;
  text: string;
}

function ExcelUploadZone<T>({ setHeadings, setData, text }: Props) {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const ws = workbook.Sheets[worksheetName];
      let sheetData: string[][] = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        raw: false,
        dateNF: "yyyy-mm-dd",
      });
      const tableHeadings = sheetData.shift() as string[];
      sheetData = sheetData.filter((row) => row.length > 1);
      sheetData = sheetData.filter((row) => row.length <= tableHeadings.length);
      setHeadings(tableHeadings);
      // const tableData: any[] = [];
      // sheetData.forEach((row) => {
      //   if (Array.isArray(row) && row?.length == 6)
      //     tableData.push({
      //       srNum: row[0],
      //       team1Id: row[1],
      //       team2Id: row[2],
      //       date: row[3],
      //       time: row[4],
      //       location: row[5],
      //     });
      // });
      setData(sheetData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="mx-4 md:mx-4 md:w-[95%] my-4 relative group border border-dashed border-gray-300 rounded-lg p-8 items-center justify-center flex text-base text-gray-800 dark:text-gray-400">
      {text}
      <input
        className="absolute inset-0 z-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        accept=".xls, .xlsx"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default ExcelUploadZone;
