import Team, { Teams } from "@/model/Team";
import connectMongo from "../lib/mongoConnect";
import { AddTeamInput } from "@/app/admin/teams/add-teams/page";
import { updateTeamInAllMatchFixtures } from "./matches";

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

    await updateAllTeamInMatch();
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateAllTeamInMatch() {
  const teams = await Team.find();
  // Check if the particular teamCode has any matches and add to that
  const promises = teams.map(
    async (team) =>
      await updateTeamInAllMatchFixtures(team.teamCode, team._id, team.name)
  );

  await Promise.all(promises);
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
    updateAllTeamInMatch();
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAllTeams(): Promise<Teams[]> {
  await connectMongo();
  const team = await Team.find();
  return team;
}

export async function getAllTeamsSorted(): Promise<Teams[]> {
  await connectMongo();
  const team = await Team.find().sort({
    points: "descending",
    goalScoredFor: "ascending",
  });
  return team;
}

export async function getTeamFromId(id: string): Promise<Teams | null> {
  try {
    await connectMongo();
    const team = await Team.findById(id);
    return team;
  } catch (err) {
    console.log(err);
    return null;
  }
}
