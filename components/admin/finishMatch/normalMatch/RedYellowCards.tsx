"use client";

import { Officials } from "@/model/Official";
import NumberPlayerInput from "./NumberPlayerInput";
import { Players } from "@/model/Player";
import { ComboBoxElement } from "../../ComboBox";

interface Props {
  team1Name: string;
  team2Name: string;
  team1Players: Players[];
  team2Players: Players[];
  team1Officials?: Officials[];
  team2Officials?: Officials[];
}

function RedYellowCards({ ...props }: Props) {
  const displayTeam1: ComboBoxElement[] = props.team1Players.map((player) => {
    return {
      value: player._id,
      label: player.name,
      sublabel: player.regId,
    };
  });

  const displayTeam2: ComboBoxElement[] = props.team2Players.map((player) => {
    return {
      value: player._id,
      label: player.name,
      sublabel: player.regId,
    };
  });

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold pb-4">Choose Yellow Cards:</h1>
        <NumberPlayerInput
          numberName="numYellowCards"
          inputName="yellowCards"
          addTextButton="Add Yellow Cards"
          labelForPlayerSelect="Yellow Card"
          placeholder="Enter the number of player who got yellow card"
          items1={displayTeam1}
          disabledText={"Team - " + props.team1Name}
          items2={displayTeam2}
          disabledText2={"Team - " + props.team2Name}
        />
      </div>
      <hr />
      <div>
        <h1 className="text-xl font-semibold pb-4">Choose Red Cards:</h1>
        <NumberPlayerInput
          numberName="numRedCards"
          inputName="redCards"
          addTextButton="Add Red Cards"
          labelForPlayerSelect="Red Card"
          placeholder="Enter the number of player who got red card"
          items1={displayTeam1}
          disabledText={"Team - " + props.team1Name}
          items2={displayTeam2}
          disabledText2={"Team - " + props.team2Name}
        />
      </div>
    </>
  );
}

export default RedYellowCards;
