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
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DatePickerField from "../formElements/DatePickerField";
import InputField from "../formElements/InputField";
import TimePickerField from "../formElements/TimePickerField";
import { Button } from "@/components/ui/button";
import { Venues } from "@/model/Venue";
import ComboBoxField from "../formElements/ComboBoxField";
import { ComboBox, ComboBoxElement } from "../ComboBox";

interface Props {
  match: Matches;
  checkConflict: (time: number, venueId: string) => Promise<boolean>;
  rescheduleFn: (matchId: string, time: number) => Promise<boolean>;
  venues: Venues[];
}

export interface RescheduleMatchInputs {
  venueId: string;
  date: string;
  time: string;
}

function RescheduleMatch({
  match,
  checkConflict,
  rescheduleFn,
  venues,
}: Props) {
  const displayItems: ComboBoxElement[] = venues.map((venue) => {
    return {
      value: venue.regId || venue._id,
      label: venue.name,
      sublabel: venue.regId,
    };
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [schedulingError, setSchedulingError] = useState<boolean>(false);
  const methods = useForm<RescheduleMatchInputs>();

  const onSubmit: SubmitHandler<RescheduleMatchInputs> = async (data) => {
    setLoading(true);
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
      setSchedulingError(true);
    }
    setLoading(false);
  };

  // console.log(methods.watch());

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
            <ComboBoxField
              name="venueId"
              label="Match Venue"
              isRequired={true}
              placeholderText="Select the match venue"
              disabledText="Match Venues"
              displayItems={displayItems}
              defaultValue={match.venue.venueRegId}
            />
            <DatePickerField
              label="Date"
              isRequired={true}
              name="date"
              id="date"
            />
            <TimePickerField isRequired={true} label="Time" name="time" />
            {schedulingError && (
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
              {loading == false ? (
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
