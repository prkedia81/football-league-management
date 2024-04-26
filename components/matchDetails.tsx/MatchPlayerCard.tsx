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

interface Props {
  players: string[];
  cardTitle: string;
  cardDescription: string;
  emptyStateText: string;
}

async function MatchPlayerCard({
  cardTitle,
  cardDescription,
  players,
  emptyStateText,
}: Props) {
  const playerData: { id: string; name: string }[] = [];
  for (let i = 0; i < players.length; i++) {
    const playerId = players[i];
    const player = await getPlayerFromId(playerId);
    playerData.push({
      id: playerId,
      name: player.name,
    });
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
              {playerData.map((player) => {
                return (
                  <li
                    key={player.id}
                    className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    {player.name}
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
