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
  officials: {
    pos: string;
    name: string;
    displayName?: string;
  }[];
}

function MatchOfficials({ officials }: Props) {
  for (let i = 0; i < officials.length; i++) {
    const official = officials[i];
    if (official.pos === "referee") official.displayName = "Referee";
    else if (official.pos === "assistantReferee1")
      official.displayName = "Asssistant Referee 1";
    else if (official.pos === "assistantReferee2")
      official.displayName = "Asssistant Referee 2";
    else if (official.pos === "fourthReferee")
      official.displayName = "Fourth Referee";
    else if (official.pos === "matchCommissioner")
      official.displayName = "Match Commissioner";
    else if (official.pos === "matchObserver")
      official.displayName = "Match Observer";
  }

  return (
    <Card className="w-full h-full">
      <Suspense fallback={<LoadingState />}>
        <CardHeader>
          <CardTitle>Match Officials</CardTitle>
          <CardDescription>List of officials in the match</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {officials.map((official) => {
                return (
                  official.displayName && (
                    <div
                      key={official.pos}
                      className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {official.displayName}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {official.name}
                      </dd>
                    </div>
                  )
                );
              })}
            </dl>
          </div>
        </CardContent>
      </Suspense>
    </Card>
  );
}

export default MatchOfficials;
