import React from "react";
import { getAllPlayers } from "@/services/players";
import PlayerTable from "../admin/PlayerTable";

async function AllPlayerTable() {
  const playerList = await getAllPlayers();

  return (
    <PlayerTable
      teamName={"CFL"}
      data={JSON.parse(JSON.stringify(playerList))}
      caption={"Table of all players in the league"}
    />
  );
}

export default AllPlayerTable;
