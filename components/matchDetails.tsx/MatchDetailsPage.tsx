import { Matches } from "@/model/Match";
import React from "react";
import MatchBasicDetails from "./MatchBasicDetails";
import MatchResult from "./MatchResult";
import MatchPlayerCard from "./MatchPlayerCard";
import MatchPlayerList from "./MatchPlayerList";
import MatchOfficials from "./MatchOfficials";
import MatchRemarks from "./MatchRemarks";
import MatchRefereeReport from "./MatchRefereeReport";

interface Props {
  match: Matches;
}

async function MatchDetailsPage({ match }: Props) {
  return (
    <>
      <div className="grid gap-4 mx-4 mt-6 mb-8">
        <MatchResult status={match.status} />
        <MatchBasicDetails
          venueName={match.venue.venueName}
          team1Name={match.team1.teamName || ""}
          team2Name={match.team2.teamName || ""}
          team1Score={match.team1Score}
          team2Score={match.team2Score}
          time={match.time}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <MatchPlayerCard
            players={match.team1.goalsScored || []}
            isTeam={true}
            cardTitle={"Goals Scored by " + match.team1.teamName}
            cardDescription="List of players who scored goals in the match"
            emptyStateText="No goals scored by the team"
          />
          <MatchPlayerCard
            players={match.team2.goalsScored || []}
            isTeam={true}
            cardTitle={"Goals Scored by " + match.team2.teamName}
            cardDescription="List of players who scored goals in the match"
            emptyStateText="No goals scored by the team"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <MatchPlayerCard
            players={match.yellowCards || []}
            isTeam={true}
            cardTitle={"Yellow Cards"}
            cardDescription="List of players who received a yellow card in the match"
            emptyStateText="No yellow cards in the match"
          />
          <MatchPlayerCard
            players={match.redCards || []}
            isTeam={true}
            cardTitle={"Red Cards"}
            cardDescription="List of players who received a red card in the match"
            emptyStateText="No red cards in the match"
          />
        </div>
        {match.team1.squad?.length !== 0 && (
          <MatchPlayerList
            team1Name={match.team1.teamName || ""}
            team2Name={match.team2.teamName || ""}
            team1Id={match.team1.teamId || ""}
            team2Id={match.team2.teamId || ""}
            team1Players={match.team1.squad || []}
            team2Players={match.team2.squad || []}
          />
        )}
        {match.referee && <MatchOfficials officials={match.referee} />}
        <div className="flex gap-4 w-full">
          {match.remarks && <MatchRemarks remarks={match.remarks} />}
          {match.refereeReport !== undefined && (
            <MatchRefereeReport refereeReportLink={match.refereeReport} />
          )}
        </div>
      </div>
    </>
  );
}

export default MatchDetailsPage;
