import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LoadingState from "@/app/loading";
import { getAllPlayerDataFromTeamId } from "@/services/players";

interface Props {
  team1Name: string;
  team2Name: string;
  team1Id: string;
  team2Id: string;
  team1Players: string[];
  team2Players: string[];
}

async function MatchPlayerList({
  team1Id,
  team1Name,
  team2Name,
  team2Id,
  team1Players,
  team2Players,
}: Props) {
  const team1 = await getAllPlayerDataFromTeamId(team1Id);
  const team2 = await getAllPlayerDataFromTeamId(team2Id);

  const team1Squad = team1.filter((player) =>
    team1Players.includes(player._id.toString())
  );
  const team2Squad = team2.filter((player) =>
    team2Players.includes(player._id.toString())
  );

  return (
    <Card className="w-full h-full">
      <Suspense fallback={<LoadingState />}>
        <CardHeader>
          <CardTitle>Squad List</CardTitle>
          <CardDescription>List of all players in the squad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-row divide-x divide-gray-200">
            <div className="w-full">
              <h1 className="text-center border-b pb-1 font-bold text-lg">
                {team1Name}
              </h1>
              <ul role="list" className="divide-y divide-gray-200">
                {team1Squad.map((player) => {
                  return (
                    <li
                      key={"team1Squad_" + player._id}
                      className="relative bg-white py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      {player.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full">
              <h1 className="text-center border-b pb-1 font-bold text-lg">
                {team2Name}
              </h1>
              <ul role="list" className="divide-y divide-gray-200">
                {team2Squad.map((player) => {
                  return (
                    <li
                      key={"team2Squad_" + player._id}
                      className="relative bg-white py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      {player.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </CardContent>
      </Suspense>
    </Card>
  );
}

export default MatchPlayerList;
