import React from "react";
import MatchCard from "./MatchCard";
import { Matches } from "@/model/Match";

function DisplayMatchesComponent({ matches }: { matches: Matches[] }) {
  return (
    <div className="justify-center my-8 md:justify-normal md:my-8 md:mx-4 w-full flex flex-row flex-wrap gap-8">
      {matches.map((match, i) => (
        <MatchCard key={i} {...match} />
      ))}
    </div>
  );
}

export default DisplayMatchesComponent;
