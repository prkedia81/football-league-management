"use client";

import PageHeading from "@/components/admin/Heading";
import UploadTable from "@/components/admin/UploadTable";
import UploadZone from "@/components/admin/UploadZone";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SuccessFailModal from "./SuccessFailModal";

interface Props<T> {
  pageHeading: string;
  uploadZoneText: string;
  uploadTableCaption: string;
  cellNames: string[];
  uploadButtonText: string;
  handleUploadFn: (data: T[]) => Promise<boolean>;
  addSingleElementForm?: ReactNode;
  modalSuccessHeading: string;
  modalSuccessBody: string;
  modalSuccessButtonText: string;
  modalSuccessButtonLink: string;
  modalFailHeading: string;
  modalFailBody: string;
  modalFailButtonText: string;
  modalFailButtonLink: string;
}

function AddElement<T>({
  pageHeading,
  uploadZoneText,
  uploadTableCaption,
  cellNames,
  uploadButtonText,
  handleUploadFn,
  addSingleElementForm = <></>,
  ...props
}: Props<T>) {
  const [data, setData] = useState<T[]>([]);
  const [headings, setHeadings] = useState<string[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean | undefined>();

  const handleBulkUpload = async (data: T[]) => {
    setUploadLoading(true);
    const response = await handleUploadFn(data);
    setUploadLoading(false);
    if (response == true) {
      setStatusModal(true);
    } else {
      setStatusModal(false);
    }
  };

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
            onClick={() => handleBulkUpload(data)}>
            {uploadLoading == false ? (
              uploadButtonText
            ) : (
              <LoadingSpinner color="text-white" />
            )}
          </Button>
        </>
      )}

      {typeof statusModal != "undefined" &&
        (statusModal == true ? (
          <SuccessFailModal
            success={true}
            heading={props.modalSuccessHeading}
            body={props.modalSuccessBody}
            buttonText={props.modalSuccessButtonText}
            buttonLink={props.modalSuccessButtonLink}
          />
        ) : (
          <SuccessFailModal
            success={false}
            heading={props.modalFailHeading}
            body={props.modalFailBody}
            buttonText={props.modalFailButtonText}
            buttonLink={props.modalFailButtonLink}
          />
        ))}
    </>
  );
}

export default AddElement;
