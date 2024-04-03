"use client";

import PageHeading from "@/components/admin/Heading";
import OutcomeSelect from "@/components/admin/finishMatchForm/OutcomeSelect";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Match from "@/model/Match";
import { useState } from "react";
import { CodeIcon, ClockIcon, WifiIcon } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { useRouter } from "next/router";
import SuccessFailModal from "@/components/admin/SuccessFailModal";
import MatchCancelledForm from "@/components/admin/finishMatchForm/MatchCancelledForm";
import MatchCompleteForm from "@/components/admin/finishMatchForm/MatchCompleteForm";
import MatchWalkoverForm from "@/components/admin/finishMatchForm/MatchWalkoverForm";
interface Props {
  params: { matchId: string };
}

// const endMatch = (data: any) => {
//   "use server";
//   console.log(data);
// };

export default function page({ params: { matchId } }: Props) {
  const [outcome, setOutcome] = useState<string | undefined>();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean | undefined>();
  // const router = useRouter(); // Initialize useRouter
  const methods = useForm();
  const onSubmit = (data: any) => {
    setUploadLoading(true);
    setStatusModal(true);
  };

  // Get match data from matchID
  // const team1Id = match.team1.teamId;
  // const team2Id = match.team2.teamId;

  // Get team names from DB
  // Get players list from DB

  // TODO: Do a long multi-form submission for the user
  return (
    <>
      <PageHeading heading="Finish Match" />
      <h1 className="mx-4 mt-4 scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl">
        Choose the outcome of the match:
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RadioGroup defaultValue="comfortable">
            <div className="flex flex-col gap-4 justify-center w-full p-4">
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    {/* <CodeIcon className="h-6 w-6" /> */}
                    <RadioGroupItem
                      value="normal"
                      id="normal"
                      onClick={(e) => setOutcome("normal")}
                    />
                    Normal Match
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The Match ended normally without any issues.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    {/* <ClockIcon className="h-6 w-6" /> */}
                    <RadioGroupItem
                      value="cancelled"
                      id="cancelled"
                      onClick={(e) => setOutcome("cancelled")}
                    />
                    Match Cancelled
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The match completed with no winner or loser.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    {/* <WifiIcon className="h-6 w-6" /> */}
                    <RadioGroupItem
                      value="walkover"
                      id="walkover"
                      onClick={(e) => setOutcome("walkover")}
                    />
                    Match Walk-over
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    There was a walk-over with one team winning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </RadioGroup>
          <Button type="submit">Next</Button>
        </form>
      </FormProvider>
      {typeof statusModal != "undefined" &&
        (statusModal == true ? (
          <>
            {outcome === "normal" && <MatchCompleteForm />}
            {outcome === "cancelled" && (
              <MatchCancelledForm matchId={matchId} />
            )}
            {outcome === "walkover" && <MatchWalkoverForm />}
          </>
        ) : (
          <></>
        ))}
    </>
  );
}
