"use client";

import { Players } from "@/model/Player";
import NumberPlayerInput from "./NumberPlayerInput";

interface Props {
  numberName: string;
  inputName: string;
  t1Squad: string[];
  t2Squad: string[];
  team1Players: Players[];
  team2Players: Players[];
}

function GoalsScored({ ...props }: Props) {
  return (
    <NumberPlayerInput
      {...props}
      addTextButton="Add Goals"
      labelForPlayerSelect="Goal"
      defaultSelectText="Choose the player who scored the goal"
    />
  );
}

export default GoalsScored;
