"use client";

import React from "react";
import { FTPUploadButton } from "./FTPUploadButton";
import { useFormContext } from "react-hook-form";

interface Props {
  field: string;
}

function FileUploadZone({ field }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FTPUploadButton
      field={field}
      onClientUploadComplete={(res) => {
        if (res !== undefined) {
          // Handled internally by FTPUploadButton
        }
      }}
      onUploadError={(error: Error) => {
        // Handled internally by FTPUploadButton
      }}
    />
  );
}

export default FileUploadZone;