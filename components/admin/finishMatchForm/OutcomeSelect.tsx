import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CodeIcon, ClockIcon, WifiIcon } from "lucide-react";
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
      <div className="flex flex-col gap-4 justify-center w-full p-4">
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <CodeIcon className="h-6 w-6" />
              <div className="text-sm font-bold leading-none">Manual</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can manually refresh your data at any time.
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-6 w-6" />
              <div className="text-sm font-bold leading-none">Automatic</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your data will be automatically refreshed every 5 minutes.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <WifiIcon className="h-6 w-6" />
              <div className="text-sm font-bold leading-none">Real-time</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your data will be updated in real-time as changes occur.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OutcomeSelect;
