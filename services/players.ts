import connectMongo from "../lib/mongoConnect";
import Player, { Players } from "@/model/Player";
import { AddPlayerInputs } from "@/app/admin/teams/manage-players/[teamId]/add-players/page";
import { convertToTitleCase } from "@/lib/utils";

export async function createBulkNewPlayers(data: any[], teamId: string) {
  // @ts-ignore
  const dbEntries = [];

  data.forEach((item) => {
    // [ '1', 'Bhaichung Bhutia', 'AB12'],
    if (item.length == 0) return;
    const row = {
      name: convertToTitleCase(item[2]),
      regId: item[1],
      teamId: teamId,
      //   teamCode: item[3],
      //   email: item[4],
    };
    dbEntries.push(row);
  });

  await connectMongo();
  try {
    // @ts-ignore-ignore
    const players = await Player.create(dbEntries).catch((err) => {
      console.log(err);
      throw Error(err);
    });

    return true;
  } catch (err) {
    return false;
  }
}

export async function createNewPlayer(data: AddPlayerInputs, teamId: string) {
  // {
  //   name: 'asd',
  //   regId: '123sd',
  // }
  await connectMongo();
  try {
    const player = await Player.create({ ...data, teamId: teamId }).catch(
      (err) => {
        console.log(err);
        throw Error(err);
      }
    );

    return true;
  } catch (err) {
    return false;
  }
}

export async function getAllPlayers() {
  await connectMongo();
  const player = await Player.find();
  return player;
}

export async function getPlayerFromId(id: string): Promise<Players> {
  await connectMongo();
  const player = await Player.findById(id);
  return player;
}

export async function getAllPlayerDataFromTeamId(id: string) {
  const players = await Player.find({ teamId: id }).sort({ name: 1 });
  return players;
}
