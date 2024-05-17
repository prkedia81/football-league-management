"use client";

import { Players } from "@/model/Player";
import NumberPlayerInput from "./NumberPlayerInput";
import { ComboBoxElement } from "../../ComboBox";

interface Props {
  team1Name: string;
  team2Name: string;
  numberName: string;
  inputName: string;
  // t1Squad?: string[];
  // t2Squad?: string[];
  team1Players: Players[];
  team2Players: Players[];
  placeholder?: string;
  firstTeam: number;
}

function GoalsScored({ ...props }: Props) {
  // const t1Players =
  //   props.t1Squad !== undefined
  //     ? props.team1Players.filter((player) =>
  //         props.t1Squad.includes(player._id)
  //       )
  //     : props.team1Players;

  // const t2Players =
  //   props.t2Squad !== undefined
  //     ? props.team2Players.filter((player) =>
  //         props.t2Squad.includes(player._id)
  //       )
  //     : props.team2Players;

  const displayItems1: ComboBoxElement[] = props.team1Players.map((player) => {
    return {
      value: player._id,
      label: player.name,
      sublabel: player.regId,
    };
  });

  const displayItems2: ComboBoxElement[] = props.team2Players.map((player) => {
    return {
      value: player._id,
      label: player.name,
      sublabel: player.regId,
    };
  });

  return (
    <NumberPlayerInput
      numberName={props.numberName}
      inputName={props.inputName}
      addTextButton="Add Goals"
      labelForPlayerSelect="Goal"
      placeholder={props.placeholder}
      items1={props.firstTeam === 1 ? displayItems1 : displayItems2}
      items2={props.firstTeam === 2 ? displayItems1 : displayItems2}
      disabledText={
        props.firstTeam === 1
          ? "Team - " + props.team1Name
          : "Team - " + props.team2Name
      }
      disabledText2={
        props.firstTeam === 2
          ? "Team - " + props.team1Name
          : "Team - " + props.team2Name
      }
    />
  );
}

export default GoalsScored;
