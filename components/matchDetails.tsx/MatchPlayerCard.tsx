import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getPlayerFromId } from "@/services/players";
import LoadingState from "@/app/loading";
import { getTeamFromId } from "@/services/teams";
import Custom404 from "@/app/admin/500";

interface Props {
  players: string[];
  cardTitle: string;
  cardDescription: string;
  emptyStateText: string;
  isTeam?: boolean;
}

async function MatchPlayerCard({
  cardTitle,
  cardDescription,
  players,
  emptyStateText,
  isTeam = false,
}: Props) {
  const playerData: { id: string; name: string; teamName?: string }[] = [];
  for (let i = 0; i < players.length; i++) {
    const playerId = players[i];
    const player = await getPlayerFromId(playerId);
    if (isTeam) {
      const playerTeam = await getTeamFromId(player.teamId);
      if (!playerTeam) return <Custom404 />;
      playerData.push({
        id: playerId,
        name: player.name,
        teamName: playerTeam.name,
      });
    } else {
      playerData.push({
        id: playerId,
        name: player.name,
      });
    }
  }

  return (
    <Card className="w-full h-full">
      <Suspense fallback={<LoadingState />}>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {playerData.length === 0 ? (
            <p className="text-gray-600 text-sm">{emptyStateText}</p>
          ) : (
            <ul role="list" className="divide-y divide-gray-200">
              {playerData.map((player, i) => {
                return (
                  <li
                    key={`${i}_${player.id}`}
                    className="relative bg-white py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    {player.name + " "}{" "}
                    <span className="text-gray-600 text-sm">
                      {isTeam ? ` - ${player.teamName}` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Suspense>
    </Card>
  );
}

export default MatchPlayerCard;
