"use client";

import React, { useState } from "react";
import { UploadButton } from "../uploadthing";
import "@uploadthing/react/styles.css";
import { useFormContext } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/16/solid";

interface Props {
  field: string;
}

function FileUploadZone({ field }: Props) {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const {
    register,
    setValue,
    formState: { errors },
    setError,
  } = useFormContext();

  return (
    <div className="col-span-full flex flex-row gap-8 items-center">
      <label className="block text-sm font-medium text-gray-700">
        Upload Referee Report
      </label>
      <input
        className="hidden"
        type="text"
        {...register(field, { required: true })}
      />
      {uploaded ? (
        <div className="mt-4 relative flex flex-col items-center w-full border border-green-400 rounded-lg p-8 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <CheckIcon className="h-12 w-12 text-gray-500" />
          <span className="mt-2 block text-sm text-gray-600">
            Uploaded referee report - {fileName}
            <br />
            To upload a new file, refresh the page and re-upload file
          </span>
        </div>
      ) : (
        <UploadButton
          endpoint="refereeReportUploader"
          onClientUploadComplete={(res) => {
            if (res !== undefined) {
              setValue(field, res[0].url);
              setFileName(res[0].name);
              setUploaded(true);
            }
          }}
          onUploadError={(error: Error) => {
            setError(field, {
              type: "upload",
              message: error.message,
            });
          }}
        />
      )}
      <span className="text-red-600 text-sm mt-0.5">
        {errors[field]?.type === "upload"
          ? `${errors[field]?.message}`
          : errors[field]?.type === "required"
          ? "This field is required"
          : errors[field]
          ? (errors[field]?.message as string)
          : null}
      </span>
    </div>
  );
}

export default FileUploadZone;
