import React from "react";
import RadioElement from "./RadioElement";
import { useFormContext } from "react-hook-form";

interface Props {
  team1Name: string;
  team2Name: string;
}

function Winner({ team1Name, team2Name }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
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
      {errors.winner?.message && (
        <p className="mt-2 text-sm text-red-400">{"Select one outcome"}</p>
      )}
    </div>
  );
}

export default Winner;
