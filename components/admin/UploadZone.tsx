"use client";

import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

const UploadPage = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <UploadZone
        text="Upload list of matches in .xlsx or .xls format"
        fileType=".xls, .xlsx"
        onChangeFn={handleFileUpload}
      />
      <table>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface Props {
  text: string;
  onChangeFn: (event: ChangeEvent<HTMLInputElement>) => void;
  fileType: string;
}

function UploadZone({ text, fileType, onChangeFn }: Props) {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="mx-4 w-[95%] my-4 relative group border border-dashed border-gray-300 rounded-lg p-6 items-center justify-center flex text-sm text-gray-700 dark:text-gray-400">
        {text}
        <input
          className="absolute inset-0 z-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          accept={fileType}
          onChange={onChangeFn}
        />
      </div>
    </div>
  );
}

export default UploadPage;
