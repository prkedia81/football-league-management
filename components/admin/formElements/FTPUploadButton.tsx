'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckIcon } from '@heroicons/react/16/solid';

interface FTPUploadButtonProps {
  endpoint?: string; // Kept for compatibility
  field: string;
  onClientUploadComplete?: (res: { url: string; name: string }[]) => void;
  onUploadError?: (error: Error) => void;
}

export function FTPUploadButton({
  field,
  onClientUploadComplete,
  onUploadError,
}: FTPUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const {
    register,
    setValue,
    formState: { errors },
    setError,
  } = useFormContext();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setValue(field, result.fileUrl);
        setFileName(result.name);
        setUploaded(true);
        if (onClientUploadComplete) {
          onClientUploadComplete([{ url: result.fileUrl, name: result.name }]);
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      setError(field, {
        type: 'upload',
        message: error.message,
      });
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setIsUploading(false);
    }
  };

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
        <div>
          <input
            type="file"
            id={`${field}-input`}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf"
          />
          <label
            htmlFor={`${field}-input`}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </label>
        </div>
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