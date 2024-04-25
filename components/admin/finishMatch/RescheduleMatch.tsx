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
import { checkSchedulingConflict } from "@/services/venues";

interface Props {
  match: Matches;
  checkConflict: (time: number, venueId: string) => Promise<boolean>;
  rescheduleFn: (matchId: string, time: number) => Promise<boolean>;
}

export interface RescheduleMatchInputs {
  venueId: string;
  date: string;
  time: string;
}

function RescheduleMatch({ match, checkConflict, rescheduleFn }: Props) {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const methods = useForm<RescheduleMatchInputs>();

  const onSubmit: SubmitHandler<RescheduleMatchInputs> = async (data) => {
    const matchTime = new Date(data.date);
    const [hour, min] = data.time.split(":");
    matchTime.setHours(parseInt(hour));
    matchTime.setMinutes(parseInt(min));
    const time = matchTime.getTime();

    const resp = await checkConflict(time, match.venue.venueId);

    if (!resp) {
      const reschedule = await rescheduleFn(match._id, time);
      if (reschedule) setSuccess(true);
    } else {
      setError(true);
    }
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
            {error && (
              <p className="text-red-500 text-sm my-4">
                There is a scheduling conflict in the venue at that time, pick
                another time.
              </p>
            )}
            {success && (
              <p className="text-green-500 text-sm my-4">
                The match has been rescheduled!
              </p>
            )}
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
