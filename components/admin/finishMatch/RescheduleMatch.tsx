"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import { dateFormat, timeFormat } from "@/lib/utils";
import { rescheduleEmail } from "@/services/emailService";

interface Props {
  match: Matches;
  checkConflict: (time: number, venueId: string) => Promise<boolean>;
  rescheduleFn: (
    matchId: string,
    venueId: string,
    time: number
  ) => Promise<boolean>;
  rescheduleEmailFn: (matchId: string) => Promise<void>;
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
  rescheduleEmailFn,
}: Props) {
  const displayItems: ComboBoxElement[] = venues.map((venue) => {
    return {
      value: venue.regId || venue._id,
      label: venue.name,
      sublabel: venue.regId,
    };
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [schedulingError, setSchedulingError] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ venueId: string; time: number }>();
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);
  const methods = useForm<RescheduleMatchInputs>();

  const onSubmit: SubmitHandler<RescheduleMatchInputs> = async (data) => {
    setLoading(true);
    const matchTime = new Date(data.date);
    const [hour, min] = data.time.split(":");
    matchTime.setHours(parseInt(hour));
    matchTime.setMinutes(parseInt(min));
    const time = matchTime.getTime();

    const resp = await checkConflict(time, methods.getValues("venueId"));

    if (resp) {
      setSchedulingError(true);
      setFormData(undefined);
      setLoading(false);
    } else {
      setLoading(false);
      setSchedulingError(false);
      setFormData({ venueId: data.venueId, time: time });
    }

    // if (!resp) {
    //   const reschedule = await rescheduleFn(match._id, time);
    //   if (reschedule) setSuccess(true);
    // } else {
    //   setSchedulingError(true);
    // }
    // setLoading(false);
  };

  const confirmReschedule = async () => {
    setConfirmLoading(true);
    if (!formData) return;
    const reschedule = await rescheduleFn(
      match._id,
      methods.getValues("venueId"),
      formData.time
    );
    if (reschedule) setSuccess(true);
    setConfirmLoading(false);
  };

  const sendRescheduleEmail = async () => {
    setEmailLoading(true);
    const email = await rescheduleEmailFn(match._id);
    setEmailLoading(false);
    setEmailSuccess(true);
  };

  return (
    <>
      <Card className="mx-2 my-2 md:mx-4 md:my-4 md:w-[95%] border-0 shadow-none">
        <CardHeader>
          <CardTitle>Re-schedule Match</CardTitle>
          <CardDescription>
            Choose the new date and time for the match
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              className="space-y-2"
              onSubmit={methods.handleSubmit(onSubmit)}>
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
              <TimePickerField
                isRequired={true}
                label="Start Time"
                name="time"
              />
              {schedulingError && (
                <p className="text-red-600 text-sm my-4">
                  There is a scheduling conflict in the venue at that time, pick
                  another time.
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
      {formData && (
        <Card className="mx-2 md:mx-8 md:w-[95%] shadow-none">
          <CardHeader>
            <CardTitle>Confirm Re-schedule</CardTitle>
            <CardDescription>Confirm the re-schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">
              <span className="font-semibold">
                {match.team1.teamName + " v/s " + match.team2.teamName}
              </span>
            </p>
            <p className="">
              <span className="font-semibold">Date: </span>
              {dateFormat(formData.time)}
            </p>
            <p className="">
              <span className="font-semibold">Venue ID: </span>
              {formData.venueId}
            </p>
            <p className="">
              <span className="font-semibold">Time: </span>
              {timeFormat(formData.time)}
            </p>
            {success && (
              <p className="text-green-500 text-sm my-4">
                The match has been rescheduled!
              </p>
            )}
            {emailSuccess && (
              <p className="text-green-500 text-sm my-4">
                The emails have been sent!
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-row flex-wrap gap-3">
            <Button onClick={confirmReschedule}>
              {confirmLoading == false ? (
                "Confirm Re-schedule"
              ) : (
                <LoadingSpinner color="text-white" />
              )}
            </Button>
            <Button variant="outline" onClick={sendRescheduleEmail}>
              {emailLoading == false ? (
                "Send email to teams, venue, referee etc"
              ) : (
                <LoadingSpinner color="text-white" />
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default RescheduleMatch;
