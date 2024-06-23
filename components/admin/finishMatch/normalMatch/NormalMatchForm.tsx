"use client";

import { NormalMatchFormSchema } from "@/lib/finishMatchSchema";
import MatchOutcome from "./MatchOutcome";
import PlayerSelect from "./PlayerSelect";
import { Teams } from "@/model/Team";
import { Players } from "@/model/Player";
import { Matches } from "@/model/Match";
import RedYellowCards from "./RedYellowCards";
import Officials from "./Officials";
import MultiFormSkeleton from "../MultiFormSkeleton";
import SuccessComponent from "../SuccessComponent";

interface Props {
  team1: Teams;
  team2: Teams;
  team1Players: Players[];
  team2Players: Players[];
  match: Matches;
}

export default function NormalMatchForm({ team1, team2, ...props }: Props) {
  const formDefaultValues = {
    team1Starting11: [],
    team1Gk: [],
    team1Captain: [],
    team1Substitute: [],
    team1Reserve: [],
    team2Gk: [],
    team2Captain: [],
    team2Substitute: [],
    team2Reserve: [],
  };

  const steps = [
    {
      id: "Step 1",
      name: "Players - " + team1.name,
      subheading: "Choose the squad for this team",
      fields: [
        "team1Starting11",
        "team1Gk",
        "team1Captain",
        "team1Substitute",
        "team1Reserve",
      ],
      component: (
        <PlayerSelect
          key="team1"
          starting11Field="team1Starting11"
          gkField="team1Gk"
          captainField="team1Captain"
          substituteField="team1Substitute"
          reserveField="team1Reserve"
          playerList={props.team1Players}
        />
      ),
    },
    {
      id: "Step 2",
      name: "Players - " + team2.name,
      subheading: "Choose the squad for this team",
      fields: [
        "team2Starting11",
        "team2Gk",
        "team2Captain",
        "team2Substitute",
        "team2Reserve",
      ],
      component: (
        <PlayerSelect
          key="team2"
          starting11Field="team2Starting11"
          gkField="team2Gk"
          captainField="team2Captain"
          substituteField="team2Substitute"
          reserveField="team2Reserve"
          playerList={props.team2Players}
        />
      ),
    },
    {
      id: "Step 3",
      name: "Match Outcome",
      subheading: "Choose the match outcome",
      fields: [
        "winner",
        "goalsAgainstTeam2",
        "scorerAgainstTeam2",
        "goalsAgainstTeam1",
        "scorerAgainstTeam1",
      ],
      component: (
        <MatchOutcome
          team1Name={team1.name}
          team2Name={team2.name}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 4",
      name: "Yellow and Red Cards",
      subheading: "Choose all the yellow and red cards given in the match",
      fields: ["yellowCards", "redCards", "numYellowCards", "numRedCards"],
      component: (
        <RedYellowCards
          key="yellowCards"
          team1Name={team1.name}
          team2Name={team2.name}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 5",
      name: "Officials & Remarks",
      subheading: "Add all officials and remarks in the match",
      fields: [
        "referee",
        "assistantReferee1",
        "assistantReferee2",
        "fourthReferee",
        "matchCommissioner",
        "refereeAssessor",
        "refereeReport",
        "remarks",
      ],
      component: <Officials />,
    },

    {
      id: "Step 6",
      name: "",
      subheading: "",
      fields: [],
      component: (
        <SuccessComponent
          successText="Match Finished"
          successSubtext="Match successsfully completed."
        />
      ),
    },
  ];

  return (
    <>
      <MultiFormSkeleton
        zodSchema={NormalMatchFormSchema}
        steps={steps}
        submitApiEndpoint="/api/admin/normal-match"
        match={props.match}
        formDefaultValues={formDefaultValues}
      />
    </>
  );
}
