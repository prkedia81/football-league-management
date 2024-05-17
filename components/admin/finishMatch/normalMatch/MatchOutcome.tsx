import React from "react";
import RadioElement from "./RadioElement";
import { useFormContext } from "react-hook-form";
import GoalsScored from "./GoalsScored";
import { Players } from "@/model/Player";

interface Props {
  team1Name: string;
  team2Name: string;
  team1Players: Players[];
  team2Players: Players[];
}

function MatchOutcome({ team1Name, team2Name, ...props }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold pb-4">Choose the match winner:</h1>
        <div className="flex flex-col gap-4">
          <RadioElement
            id="team1"
            name="winner"
            value="1"
            display={"Team 1 - " + team1Name}
          />
          <RadioElement
            id="team2"
            name="winner"
            value="2"
            display={"Team 2 - " + team2Name}
          />
          <RadioElement id="draw" name="winner" value="0" display="Draw" />
          {errors.winner && (
            <p className="mt-0.5 text-sm text-red-600">
              {errors.winner?.message as string}
            </p>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h1 className="text-xl font-semibold pb-4">
          {"Goals Scored By - " + team1Name}
        </h1>
        <GoalsScored
          key="againstTeam2"
          numberName="goalsAgainstTeam2"
          inputName="scorerAgainstTeam2"
          team1Name={team1Name}
          team2Name={team2Name}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
          placeholder="Enter the number of goals scored by Team 1"
          firstTeam={1}
        />
      </div>
      <hr />
      <div>
        <h1 className="text-xl font-semibold pb-4">
          {"Goals Scored By - " + team2Name}
        </h1>
        <GoalsScored
          key="againstTeam1"
          numberName="goalsAgainstTeam1"
          inputName="scorerAgainstTeam1"
          team1Name={team1Name}
          team2Name={team2Name}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
          placeholder="Enter the number of goals scored by Team 2"
          firstTeam={2}
        />
      </div>
    </>
  );
}

export default MatchOutcome;
