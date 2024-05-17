import Official, { Officials } from "@/model/Official";
import connectMongo from "./mongoConnect";
import { AddOfficialInput } from "@/app/admin/teams/manage-officials/[teamId]/add-officials/page";
import { addOfficialToTeam, getTeamOfficialsFromId } from "./teams";

export async function createBulkNewOfficials(data: any[], teamId: string) {
  // @ts-ignore
  const dbEntries = [];

  data.forEach((item) => {
    // [ '1', 'Bhaichung Bhutia', Position', 'Reg ID',],
    if (item.length == 0) return;
    const row = {
      name: item[1],
      position: item[2],
      teamId: teamId,
      //   teamCode: item[3],
      //   email: item[4],
    };
    dbEntries.push(row);
  });

  await connectMongo();
  try {
    // @ts-ignore-ignore
    const officials = await Official.create(dbEntries).catch((err) => {
      console.log(err);
      throw Error(err);
    });

    // Add official to team's official list
    officials.forEach((official) => addOfficialToTeam(teamId, official._id));

    return true;
  } catch (err) {
    return false;
  }
}

export async function createNewOfficial(
  data: AddOfficialInput,
  teamId: string
) {
  // {
  //   name: 'asd',
  //   position: '123sd',
  // }
  await connectMongo();
  try {
    const official = await Official.create({ ...data, teamId: teamId }).catch(
      (err) => {
        console.log(err);
        throw Error(err);
      }
    );

    // Add official to team's official list
    addOfficialToTeam(teamId, official._id);
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAllOfficials() {
  await connectMongo();
  const official = await Official.find();
  return official;
}

export async function getOfficialFromId(id: string): Promise<Officials> {
  await connectMongo();
  const official = await Official.findById(id);
  return official;
}

export async function getOfficialDataFromList(idList: string[]) {
  const playersPromises = idList.map((id) => getOfficialFromId(id));
  const officials = await Promise.all(playersPromises);
  return officials;
}

export async function getAllOfficialDataFromTeamId(id: string) {
  const officialList = await getTeamOfficialsFromId(id);
  const officials = await getOfficialDataFromList(officialList);
  return officials;
}
