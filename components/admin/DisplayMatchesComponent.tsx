import React from "react";
import MatchCard from "./MatchCard";
import { Matches } from "@/model/Match";

function DisplayMatchesComponent({ matches }: { matches: Matches[] }) {
  return (
    <div className="my-8 w-full mx-4 flex flex-row flex-wrap gap-8">
      {matches.map((match, i) => (
        <MatchCard key={i} {...match} />
      ))}
    </div>
  );
}

export default DisplayMatchesComponent;
