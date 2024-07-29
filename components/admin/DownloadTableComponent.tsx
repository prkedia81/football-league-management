"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "../ui/button";

async function tableToExcel(tableId: string, fileName: string) {
  const table = document.getElementById(tableId);
  console.log(table);
  const wb = XLSX.utils.book_new();
  const ws_data = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws_data, "SheetJS");

  // Convert the workbook to a binary string
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the binary string
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  // Use saveAs to download the Blob
  saveAs(blob, `${fileName}.xlsx`);
}

interface Props {
  tableId: string;
  fileName: string;
}

function DownloadTableComponent({ tableId, fileName }: Props) {
  return (
    <Button
      variant="outline"
      className="w-40 md:w-48"
      onClick={() => tableToExcel(tableId, fileName)}>
      Download in Excel
    </Button>
  );
}

export default DownloadTableComponent;
