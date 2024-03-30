"use client";

import PageHeading from "@/components/admin/Heading";
import OutcomeSelect from "@/components/admin/finishMatchForm/OutcomeSelect";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Match from "@/model/Match";
import { useState } from "react";

interface Props {
  params: { matchId: string };
}

// const endMatch = (data: any) => {
//   "use server";
//   console.log(data);
// };

export default function page({ params: { matchId } }: Props) {
  const [outcome, setOutcome] = useState<string | undefined>();
  // Get match data from matchID
  // const team1Id = match.team1.teamId;
  // const team2Id = match.team2.teamId;

  // Get team names from DB
  // Get players list from DB

  // TODO: Do a long multi-form submission for the user
  return (
    <>
      <PageHeading heading="Finish Match" />
      <OutcomeSelect />
    </>
  );
}
