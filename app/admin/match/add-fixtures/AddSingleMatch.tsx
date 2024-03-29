"use client";

import { Button } from "@/components/ui/button";
import AddIndividualEntryCard from "@/components/admin/AddIndividualEntryCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/admin/formElements/InputField";
import DatePickerField from "@/components/admin/formElements/DatePickerField";
import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";

interface Props {
  // TODO: Fix type
  handleAddFn: (data: any) => void;
}

function AddSingleMatch({ handleAddFn }: Props) {
  const methods = useForm<AddMatchInputs>();

  const onSubmit: SubmitHandler<AddMatchInputs> = (data) => {
    handleAddFn(data);
  };

  return (
    <AddIndividualEntryCard
      title="Add Single Match"
      description="Use this form to add a single match to all fixtures">
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
          <InputField
            label="Time"
            isRequired={true}
            name="time"
            id="time"
            placeholder="Select a time for the match"
          />
          {/* TODO: Get from drop down */}
          <InputField
            label="Location"
            isRequired={true}
            name="location"
            id="location"
            placeholder="Select a venue for the match"
          />
          <Button type="submit">Add Match</Button>
        </form>
      </FormProvider>
    </AddIndividualEntryCard>
  );
}
export default AddSingleMatch;
