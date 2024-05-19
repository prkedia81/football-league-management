import Team, { Teams } from "@/model/Team";
import connectMongo from "../lib/mongoConnect";
import { AddTeamInput } from "@/app/admin/teams/add-teams/page";
import { updateTeamAllMatchFixtures } from "./matches";

export async function createBulkNewTeam(data: any[]) {
  // @ts-ignore
  const dbEntries = [];

  data.forEach((item) => {
    // [ '1', 'East Bengal', 'AB12', 'A', 'prannaykedia1@gmail.com' ],
    if (item.length == 0) return;
    const row = {
      name: item[1],
      regId: item[2],
      teamCode: item[3],
      email: item[4],
    };
    dbEntries.push(row);
  });

  await connectMongo();
  try {
    // @ts-ignore-ignore
    const teams = await Team.create(dbEntries).catch((err) => {
      console.log(err);
      throw Error(err);
    });

    // Check if the particular teamCode has any matches and add to that
    teams.forEach((team) =>
      updateTeamAllMatchFixtures(team.teamCode, team._id, team.name)
    );

    return true;
  } catch (err) {
    return false;
  }
}

export async function createNewTeam(data: AddTeamInput) {
  // {
  //   name: 'asd',
  //   regId: '123sd',
  //   teamCode: 'A',
  //   email: 'prannaykedia1@gmail.com'
  // }
  await connectMongo();
  try {
    const team = await Team.create(data).catch((err) => {
      console.log(err);
      throw Error(err);
    });

    // Check if the particular teamCode has any matches and add to that
    updateTeamAllMatchFixtures(data.teamCode, team._id, team.name);
    return true;
  } catch (err) {
    return false;
  }
}

export async function addPlayerToTeam(teamId: string, playerId: string) {
  await connectMongo();
  const team = await Team.findOneAndUpdate(
    {
      _id: teamId,
    },
    {
      $push: { playerList: playerId },
    }
  );
}

export async function addOfficialToTeam(teamId: string, playerId: string) {
  await connectMongo();
  const team = await Team.findOneAndUpdate(
    {
      _id: teamId,
    },
    {
      $push: { officialList: playerId },
    }
  );
}

export async function getAllTeams() {
  await connectMongo();
  const team = await Team.find();
  return team;
}

export async function getTeamFromId(id: string): Promise<Teams> {
  await connectMongo();
  const team = await Team.findById(id);
  return team;
}

export async function getTeamPlayersFromId(id: string) {
  await connectMongo();
  const team = await Team.findById(id);
  return team.playerList;
}

export async function getTeamOfficialsFromId(id: string) {
  await connectMongo();
  const team = await Team.findById(id);
  return team.officialList;
}
