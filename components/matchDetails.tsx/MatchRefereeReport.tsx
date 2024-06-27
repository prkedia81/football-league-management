import LoadingState from "@/app/loading";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import React, { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import Link from "next/link";

interface Props {
  refereeReportLink: string;
}

function MatchRefereeReport({ refereeReportLink }: Props) {
  return (
    <Card className="w-full h-full">
      <Suspense fallback={<LoadingState />}>
        <CardHeader>
          <CardTitle>Referee Remarks</CardTitle>
          <CardDescription>Remarks for the match</CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <div className="w-0 flex-1 flex items-center">
            <PaperClipIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span className="ml-2 flex-1 w-0 truncate text-sm text-gray-600">
              Referee Report
            </span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Link
              href={refereeReportLink}
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Download
            </Link>
          </div>
        </CardContent>
      </Suspense>
    </Card>
  );
}

export default MatchRefereeReport;
