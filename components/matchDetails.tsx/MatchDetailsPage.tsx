import { Matches } from "@/model/Match";
import React from "react";
import MatchBasicDetails from "./MatchBasicDetails";
import PageHeading from "../admin/Heading";
import MatchResult from "./MatchResult";
import MatchGoals from "./MatchGoals";

interface Props {
  match: Matches;
}

async function MatchDetailsPage({ match }: Props) {
  return (
    <>
      <PageHeading
        heading={match.team1.teamName + " v/s " + match.team2.teamName}
      />
      <div className="grid gap-2 mx-4 mt-4">
        <MatchResult status={match.status} />
        <MatchBasicDetails
          venueName={match.venue.venueName}
          team1Name={match.team1.teamName || ""}
          team2Name={match.team2.teamName || ""}
          team1Score={match.team1Score}
          team2Score={match.team2Score}
          time={match.time}
        />
        <MatchGoals
          teamName={match.team1.teamName || ""}
          players={match.team1.goalsScored || []}></MatchGoals>
      </div>
    </>
  );
}

export default MatchDetailsPage;
