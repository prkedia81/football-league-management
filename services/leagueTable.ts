import connectMongo from "../lib/mongoConnect";
import { getAllTeamsSorted } from "./teams";

export interface LeagueTableData {
  name: string;
  id: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export async function getLeagueTable(): Promise<LeagueTableData[]> {
  await connectMongo();

  const tableData: LeagueTableData[] = [];
  const allTeams = await getAllTeamsSorted();

  // Matches Played (MP), Wins (W), Draw (D), Loss (L),
  // Goals For (GF), Goals Against (GA), Goal Differnce (GD), Points
  allTeams.forEach((team) => {
    const data = {
      name: team.name,
      id: team._id,
      mp: team.matchesPlayed?.length || 0,
      w: team.matchesWon.length,
      d: team.matchesDrawn.length,
      l: team.matchesLost.length,
      gf: team.goalScoredFor,
      ga: team.goalScoredAgainst,
      gd: team.goalScoredFor - team.goalScoredAgainst,
      points: team.points,
    };
    tableData.push(data);
  });

  return tableData;
}
