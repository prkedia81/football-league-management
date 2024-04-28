import LoadingState from "@/app/loading";
import React, { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

interface Props {
  remarks: string;
}

function MatchRemarks({ remarks }: Props) {
  return (
    <Card className="w-full h-full">
      <Suspense fallback={<LoadingState />}>
        <CardHeader>
          <CardTitle>Referee Remarks</CardTitle>
          <CardDescription>Remarks for the match</CardDescription>
        </CardHeader>
        <CardContent className="text-gray-800 text-sm">{remarks}</CardContent>
      </Suspense>
    </Card>
  );
}

export default MatchRemarks;
