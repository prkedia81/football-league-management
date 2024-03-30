"use client";

import { Button } from "@/components/ui/button";
import AddIndividualEntryCard from "@/components/admin/AddIndividualEntryCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/admin/formElements/InputField";
import DatePickerField from "@/components/admin/formElements/DatePickerField";
import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import { useState } from "react";
import SuccessFailModal from "@/components/admin/SuccessFailModal";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import TimePickerField from "@/components/admin/formElements/TimePickerField";

interface Props {
  // TODO: Fix type
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

function AddSingleMatch({ handleAddFn, ...props }: Props) {
  const methods = useForm<AddMatchInputs>();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
        title="Add Single Match"
        description="Use this form to add a single match to all fixtures"
      >
        <FormProvider {...methods}>
          <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Team 1 ID"
              isRequired={true}
              name="team1Id"
              id="team1Id"
              placeholder="Enter team 1's ID (For eg, A or B or C etc)"
            />
            <InputField
              label="Team 2 ID"
              isRequired={true}
              name="team2Id"
              id="team2Id"
              placeholder="Enter team 2's ID (For eg, A or B or C etc)"
            />
            <DatePickerField
              label="Date"
              isRequired={true}
              name="date"
              id="date"
            />
            {/* TODO: Time Picker */}
            <TimePickerField
              label="Time"
              isRequired={true}
              name="time"
              id="time"
            />
            {/* <TimePicker12 /> */}
            {/* TODO: Get from drop down */}
            <InputField
              label="Location"
              isRequired={true}
              name="location"
              id="location"
              placeholder="Select a venue for the match"
            />
            <Button type="submit">
              {uploadLoading == false ? (
                "Add Match"
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
export default AddSingleMatch;
