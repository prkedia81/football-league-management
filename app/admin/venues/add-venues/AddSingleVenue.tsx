"use client";

import { Button } from "@/components/ui/button";
import AddIndividualEntryCard from "@/components/admin/AddIndividualEntryCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/admin/formElements/InputField";
import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import { useState } from "react";
import SuccessFailModal from "@/components/admin/SuccessFailModal";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

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

function AddSingleVenue({ handleAddFn, ...props }: Props) {
  const methods = useForm<AddMatchInputs>();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean | undefined>();

  const onSubmit: SubmitHandler<AddMatchInputs> = async (data) => {
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
        title="Add a Venue"
        description="Use this form to add a single venue to the League">
        <FormProvider {...methods}>
          <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Venue Name"
              isRequired={true}
              name="name"
              id="name"
              placeholder="Enter Venue's Name"
            />
            <InputField
              label="Venue Registration ID"
              isRequired={true}
              name="regId"
              id="regId"
              placeholder="Enter Venue's Registration ID"
            />
            <InputField
              label="Club Email"
              type="email"
              isRequired={true}
              name="email"
              id="email"
              placeholder="Enter Venue's Email"
              withAddOn={true}
              addOnText="@"
            />
            <Button type="submit">
              {uploadLoading == false ? (
                "Add Venue"
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
export default AddSingleVenue;
