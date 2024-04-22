"use client";

import NumberPlayerInput from "./NumberPlayerInput";
import { Players } from "@/model/Player";

interface Props {
  t1Squad: string[];
  t2Squad: string[];
  team1Players: Players[];
  team2Players: Players[];
}

function RedCards({ ...props }: Props) {
  return (
    <NumberPlayerInput
      {...props}
      numberName="numRedCards"
      inputName="redCards"
      addTextButton="Add Red Cards"
      labelForPlayerSelect="Red Card"
      defaultSelectText="Choose the player who scored the red card"
    />
  );
}

export default RedCards;
