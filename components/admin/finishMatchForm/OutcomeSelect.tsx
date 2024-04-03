import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CodeIcon, ClockIcon, WifiIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

function OutcomeSelect() {
  return (
    <>
      <h1 className="mx-4 mt-4 scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl">
        Choose the outcome of the match:
      </h1>
      <RadioGroup defaultValue="comfortable">
        <div className="flex flex-col gap-4 justify-center w-full p-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                {/* <CodeIcon className="h-6 w-6" /> */}
                <RadioGroupItem value="normal" id="normal" />
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
                <RadioGroupItem value="cancelled" id="cancelled" />
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
                <RadioGroupItem value="walkover" id="walkover" />
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
    </>
  );
}

export default OutcomeSelect;
