"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Matches } from "@/model/Match";
import { title } from "process";
import React, { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import DatePickerField from "../formElements/DatePickerField";
import InputField from "../formElements/InputField";
import TimePickerField from "../formElements/TimePickerField";
import { Button } from "@/components/ui/button";

interface Props {
  match: Matches;
}

interface RescheduleMatchInputs {
  venueId: string;
  date: string;
  time: string;
}

function RescheduleMatch({ match }: Props) {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const methods = useForm<RescheduleMatchInputs>();

  const onSubmit: SubmitHandler<RescheduleMatchInputs> = (data) => {
    console.log(data);
  };

  return (
    <Card className="mx-4 my-4 w-[95%] border-0 shadow-none">
      <CardHeader>
        <CardTitle>Re-schedule Match</CardTitle>
        <CardDescription>
          Choose the new date and time for the match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Venue ID"
              isRequired={true}
              name="venueId"
              id="venueId"
              placeholder="Enter the venue ID (eg. SA12)"
              value={match.venue.venueRegId}
            />
            <DatePickerField
              label="Date"
              isRequired={true}
              name="date"
              id="date"
            />
            <TimePickerField isRequired={true} label="Time" name="time" />
            <Button type="submit">
              {uploadLoading == false ? (
                "Re-schedule Match"
              ) : (
                <LoadingSpinner color="text-white" />
              )}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}

export default RescheduleMatch;
