import connectMongo from "./mongoConnect";
import Player, { Players } from "@/model/Player";
import { AddPlayerInputs } from "@/app/admin/teams/manage-players/[teamId]/add-players/page";
import { addPlayerToTeam, getTeamFromId, getTeamPlayersFromId } from "./teams";

export async function createBulkNewPlayers(data: any[], teamId: string) {
  // @ts-ignore
  const dbEntries = [];

  data.forEach((item) => {
    // [ '1', 'Bhaichung Bhutia', 'AB12'],
    if (item.length == 0) return;
    const row = {
      name: item[1],
      regId: item[2],
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

    // Add player to team's player list
    players.forEach((player) => addPlayerToTeam(teamId, player._id));

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

    // Add player to team's player list
    addPlayerToTeam(teamId, player._id);
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

export async function getPlayerFromId(id: string) {
  await connectMongo();
  const player = await Player.findById(id);
  return player;
}

export async function getPlayerDataFromList(idList: string[]) {
  const playersPromises = idList.map((id) => getPlayerFromId(id));
  const players = await Promise.all(playersPromises);
  return players;
}

export async function getAllPlayerDataFromTeamId(id: string) {
  const playerList = await getTeamPlayersFromId(id);
  const players = await getPlayerDataFromList(playerList);
  return players;
}
