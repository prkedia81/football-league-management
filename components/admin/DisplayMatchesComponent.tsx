import React from "react";
import MatchCard from "./MatchCard";
import { Matches } from "@/model/Match";

function DisplayMatchesComponent({ matches }: { matches: Matches[] }) {
  // const unplayedMatches = matches.filter(
  //   (match) => match.status === "unplayed"
  // );

  // const playedMatches = matches.filter((match) => match.status !== "unplayed");
  return (
    <div className="justify-center my-8 md:justify-normal md:my-8 md:mx-4 w-full flex flex-row flex-wrap gap-8">
      {/* {unplayedMatches.map((match, i) => (
        <MatchCard key={match._id} {...match} />
      ))}
      {playedMatches.map((match, i) => (
        <MatchCard key={match._id} {...match} />
      ))} */}
      {matches.map((match, i) => (
        <MatchCard key={match._id} {...match} />
      ))}
    </div>
  );
}

export default DisplayMatchesComponent;
