import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  status: string;
}

function MatchResult({ status }: Props) {
  // status => unplayed, completed, unruly, noShow, informed, othersWalkover, cancelled
  const classStatus = [
    {
      status: "unplayed",
      class: "",
      text: "The match is still unplayed.",
    },
    {
      status: "completed",
      class:
        "bg-green-300 bg-opacity-30 text-green-800 rounded border border-green-500",
      text: "The match was successfully completed!",
    },
    {
      status: "unruly",
      class:
        "bg-red-300 bg-opacity-30 text-red-700 rounded border border-red-500",
      text: "There was a walkover due to unruly behaviour!",
    },
    {
      status: "informed",
      class:
        "bg-indigo-300 bg-opacity-30 text-indigo-800 rounded border border-indigo-500",
      text: "The opponent team informed 48 hours in advance about a no show.",
    },
    {
      status: "noShow",
      class:
        "bg-red-300 bg-opacity-30 text-red-700 rounded border border-red-500",
      text: "The opponent team did not show up for the match without any intimation.",
    },
    {
      status: "othersWalkover",
      class:
        "bg-indigo-300 bg-opacity-30 text-indigo-800 rounded border border-indigo-500",
      text: "There was a walkover for miscellanous reasons.",
    },
    {
      status: "cancelled",
      class:
        "bg-red-300 bg-opacity-30 text-red-700 rounded border border-red-500",
      text: "The match has been cancelled!",
    },
  ];

  const cardClass = classStatus.filter((item) => item.status === status)[0];

  return (
    <div className={cn(cardClass.class, "py-4 px-4 shadow-sm")}>
      {cardClass.text}
    </div>
  );
}

export default MatchResult;
