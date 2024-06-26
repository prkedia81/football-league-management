"use client";

import { Button } from "@/components/ui/button";
import AddIndividualEntryCard from "@/components/admin/AddIndividualEntryCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/admin/formElements/InputField";
import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import { useState } from "react";
import SuccessFailModal from "@/components/admin/SuccessFailModal";
import LoadingSpinner from "@/components/LoadingSpinner";

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

function AddSingleTeam({ handleAddFn, ...props }: Props) {
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
        title="Add a Club"
        description="Use this form to add a single Team to the League">
        <FormProvider {...methods}>
          <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Club Name"
              isRequired={true}
              name="name"
              id="name"
              placeholder="Enter Club's Name"
            />
            <InputField
              label="Team Registration ID (CRS ID)"
              isRequired={true}
              name="regId"
              id="regId"
              placeholder="Enter team 1's Registration ID"
            />
            <InputField
              label="Team Lottery Code"
              isRequired={true}
              name="teamCode"
              id="teamCode"
              placeholder="Add the lottery code for the team (eg. A, B etc)"
            />
            <InputField
              label="Club Email"
              type="email"
              isRequired={true}
              name="email"
              id="email"
              placeholder="Enter Club's Email"
              withAddOn={true}
              addOnText="@"
            />
            <Button type="submit">
              {uploadLoading == false ? (
                "Add Team"
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
export default AddSingleTeam;
