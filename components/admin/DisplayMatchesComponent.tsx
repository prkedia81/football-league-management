"use client";

import React, { useState } from "react";
import MatchCard from "./MatchCard";
import { Matches } from "@/model/Match";
import { Button } from "../ui/button";
import { ArrowUpDownIcon, CalendarIcon, TableIcon } from "lucide-react";
import MatchTable from "./MatchTable";

function DisplayMatchesComponent({ matches }: { matches: Matches[] }) {
  const [selectedView, setSelectedView] = useState<"status" | "table" | "date">(
    "date"
  );

  const unplayedMatches = matches.filter(
    (match) => match.status === "unplayed"
  );

  const playedMatches = matches.filter((match) => match.status !== "unplayed");
  return (
    <div className="my-2 md:mx-4 ">
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
              <MatchCard key={match._id} {...match} />
            ))}
            {playedMatches.map((match, i) => (
              <MatchCard key={match._id} {...match} />
            ))}
          </>
        )}
        {selectedView === "date" && (
          <>
            {matches.map((match, i) => (
              <MatchCard key={match._id} {...match} />
            ))}
          </>
        )}
        {selectedView === "table" && <MatchTable data={matches} />}
      </div>
    </div>
  );
}

export default DisplayMatchesComponent;
