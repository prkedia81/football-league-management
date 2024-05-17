"use client";

import { Button } from "@/components/ui/button";
import AddIndividualEntryCard from "@/components/admin/AddIndividualEntryCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/admin/formElements/InputField";
import { useState } from "react";
import SuccessFailModal from "@/components/admin/SuccessFailModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AddOfficialInput } from "./page";

interface Props {
  handleAddFn: (data: any) => Promise<boolean>;
  modalSuccessHeading: string;
  modalSuccessBody: string;
  modalSuccessButtonText: string;
  modalSuccessButtonLink: string;
  modalFailHeading: string;
  modalFailBody: string;
  modalFailButtonText: string;
  modalFailButtonLink: string;
}

function AddSingleOfficial({ handleAddFn, ...props }: Props) {
  const methods = useForm<AddOfficialInput>();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean | undefined>();

  const onSubmit: SubmitHandler<AddOfficialInput> = async (data) => {
    setUploadLoading(true);
    const response = await handleAddFn(data);
    setUploadLoading(false);
    if (response == true) {
      setStatusModal(true);
    } else {
      setStatusModal(false);
    }
  };

  return (
    <>
      <AddIndividualEntryCard
        title="Add a Official"
        description="Use this form to add an individual official to the team">
        <FormProvider {...methods}>
          <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Name"
              isRequired={true}
              name="name"
              id="name"
              placeholder="Enter Official's Name"
            />
            <InputField
              label="Position"
              isRequired={true}
              name="position"
              id="position"
              placeholder="Add Official's Position (eg. Coach, assistant coach etc)"
            />
            <InputField
              label="Registration Number"
              isRequired={false}
              name="regId"
              id="regId"
              placeholder="Enter Official's Registration Number"
            />
            {/* <InputField
              label="Jersey Number"
              isRequired={true}
              name="jerno"
              id="jerno"
              placeholder="Player's Jersey Number"
            /> */}
            <Button type="submit">
              {uploadLoading == false ? (
                "Add Official"
              ) : (
                <LoadingSpinner color="text-white" />
              )}
            </Button>
          </form>
        </FormProvider>
      </AddIndividualEntryCard>

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
export default AddSingleOfficial;
