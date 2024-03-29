"use client";

import PageHeading from "@/components/admin/Heading";
import UploadTable from "@/components/admin/UploadTable";
import UploadZone from "@/components/admin/UploadZone";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

interface Props<T> {
  pageHeading: string;
  uploadZoneText: string;
  uploadTableCaption: string;
  cellNames: string[];
  uploadButtonText: string;
  handleUploadFn: (data: T[]) => void;
  addSingleElementForm?: ReactNode;
}

function AddElement<T>({
  pageHeading,
  uploadZoneText,
  uploadTableCaption,
  cellNames,
  uploadButtonText,
  handleUploadFn,
  addSingleElementForm = <></>,
}: Props<T>) {
  const [data, setData] = useState<T[]>([]);
  const [headings, setHeadings] = useState<string[]>([]);

  return (
    <>
      <PageHeading heading={pageHeading} />
      {data.length == 0 && (
        <div className="flex flex-col w-full gap-2">
          <UploadZone
            text={uploadZoneText}
            setData={setData}
            setHeadings={setHeadings}
          />
          <p className="text-center">OR</p>
          {addSingleElementForm}
        </div>
      )}

      {data.length != 0 && (
        <>
          <UploadTable
            headings={headings}
            cellNames={cellNames}
            data={data}
            caption={uploadTableCaption}
          />

          <Button
            variant="default"
            className="mx-4 my-4"
            onClick={() => handleUploadFn(data)}>
            {uploadButtonText}
          </Button>
        </>
      )}
    </>
  );
}

export default AddElement;
