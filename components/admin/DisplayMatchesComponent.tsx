"use client";

import React, { useState } from "react";
import MatchCard from "./MatchCard";
import { Matches } from "@/model/Match";
import { Button } from "../ui/button";
import { ArrowUpDownIcon, CalendarIcon, TableIcon } from "lucide-react";
import MatchTable from "./MatchTable";

interface Props {
  isAdmin?: boolean;
  matches: Matches[];
}

function DisplayMatchesComponent({ matches, isAdmin = true }: Props) {
  const [selectedView, setSelectedView] = useState<"status" | "table" | "date">(
    "date"
  );

  const unplayedMatches = matches.filter(
    (match) => match.status === "unplayed"
  );

  const playedMatches = matches.filter((match) => match.status !== "unplayed");
  return (
    <div className="my-2 mx-4 ">
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          onClick={() => setSelectedView("date")}
          variant={selectedView === "date" ? "secondary" : "outline"}>
          <CalendarIcon className="w-4 h-4 mr-2" />
          Sort by Date
        </Button>
        <Button
          size="sm"
          onClick={() => setSelectedView("status")}
          variant={selectedView === "status" ? "secondary" : "outline"}>
          <ArrowUpDownIcon className="w-4 h-4 mr-2" />
          Sort by Status
        </Button>
        <Button
          size="sm"
          onClick={() => setSelectedView("table")}
          variant={selectedView === "table" ? "secondary" : "outline"}>
          <TableIcon className="w-4 h-4 mr-2" />
          Table View
        </Button>
      </div>
      <div className="my-4 justify-center md:justify-normal w-full flex flex-row flex-wrap gap-8">
        {selectedView === "status" && (
          <>
            {unplayedMatches.map((match, i) => (
              <MatchCard key={match._id} {...match} isAdmin={isAdmin} />
            ))}
            {playedMatches.map((match, i) => (
              <MatchCard key={match._id} {...match} isAdmin={isAdmin} />
            ))}
          </>
        )}
        {selectedView === "date" && (
          <>
            {matches.map((match, i) => (
              <MatchCard key={match._id} {...match} isAdmin={isAdmin} />
            ))}
          </>
        )}
        {selectedView === "table" && (
          <MatchTable isAdmin={isAdmin} data={matches} />
        )}
      </div>
 <div className="mt-4 mb-2 w-full flex justify-center">
  <div className="flex flex-row gap-3 px-4 py-1 rounded-md shadow-sm text-xs text-gray-700 items-center justify-center">
    <div className="flex items-center gap-1 group relative">
      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 border border-green-300 rounded-sm" />
      <span className="hidden sm:inline">Complete</span>
      <span className="absolute sm:hidden bottom-full mb-1 px-2 py-1 text-[10px] bg-gray-200 text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Complete
      </span>
    </div>
    <div className="flex items-center gap-1 group relative">
      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 border border-red-300 rounded-sm" />
      <span className="hidden sm:inline">Cancelled</span>
      <span className="absolute sm:hidden bottom-full mb-1 px-2 py-1 text-[10px] bg-gray-200 text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Cancelled
      </span>
    </div>
    <div className="flex items-center gap-1 group relative">
      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-100 border border-indigo-300 rounded-sm" />
      <span className="hidden sm:inline">Other</span>
      <span className="absolute sm:hidden bottom-full mb-1 px-2 py-1 text-[10px] bg-gray-200 text-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Other
      </span>
    </div>
  </div>
</div>
    </div>
  );
}

export default DisplayMatchesComponent;
