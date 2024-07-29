import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Link from "next/link";
import DownloadTableComponent from "../admin/DownloadTableComponent";
import { getAllPlayers } from "@/services/players";
import PlayerTable from "../admin/PlayerTable";

async function AllPlayerTable() {
  const playerList = await getAllPlayers();

  return (
    <PlayerTable
      teamName={"CFL"}
      data={playerList}
      caption={"Table of all players in the league"}
    />
  );
}

export default AllPlayerTable;
