"use client";

import NumberPlayerInput from "./NumberPlayerInput";
import { Players } from "@/model/Player";

interface Props {
  t1Squad: string[];
  t2Squad: string[];
  team1Players: Players[];
  team2Players: Players[];
}

function YellowCards({ ...props }: Props) {
  return (
    <NumberPlayerInput
      {...props}
      numberName="numYellowCards"
      inputName="yellowCards"
      addTextButton="Add Yellow Cards"
      labelForPlayerSelect="Yellow Card"
      defaultSelectText="Choose the player who scored the yellow card"
    />
  );
}

export default YellowCards;
