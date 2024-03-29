"use client";

import { Button } from "@/components/ui/button";
import AddIndividualEntryCard from "@/components/admin/AddIndividualEntryCard";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/admin/formElements/InputField";
import DatePickerField from "@/components/admin/formElements/DatePickerField";

interface AddTeamInputs {
  name: string;
  regId: string;
  teamCode: string;
  email: string;
}

function AddSingleTeam() {
  const methods = useForm<AddTeamInputs>();

  const onSubmit: SubmitHandler<AddTeamInputs> = (data) => {
    console.log(data);
  };

  return (
    <AddIndividualEntryCard
      title="Add Single Team"
      description="Use this form to add a single new team">
      <FormProvider {...methods}>
        <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            label="Team Name"
            isRequired={true}
            name="name"
            id="name"
            placeholder="Enter team's name"
          />
          <InputField
            label="Team Registration ID"
            isRequired={true}
            name="regId"
            id="regId"
            placeholder="Enter team's registration ID"
          />
          <InputField
            label="Team Code"
            isRequired={true}
            name="teamCode"
            id="teamId"
            placeholder="Enter team's code (For eg, A or B or C etc)"
          />
          <InputField
            label="Email"
            isRequired={true}
            type="emai;"
            name="email"
            id="email"
            placeholder="Enter team's email"
          />
          <Button type="submit">Add Team</Button>
        </form>
      </FormProvider>
    </AddIndividualEntryCard>
  );
}
export default AddSingleTeam;
