import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getPlayerFromId } from "@/services/players";

interface Props {
  teamName: string;
  players: string[];
}

function MatchGoals({ teamName, players }: Props) {
  async function getPlayerName(playerId: string) {
    const player = await getPlayerFromId(playerId);
    return player.name;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Scored by</CardTitle>
        <CardDescription>
          List of players who scored goals in the match
        </CardDescription>
      </CardHeader>
      <CardContent>
        {players.map(async (playerId, index) => {
          return <li key={index}>{await getPlayerName(playerId)}</li>;
        })}
      </CardContent>
    </Card>
  );
}

export default MatchGoals;
