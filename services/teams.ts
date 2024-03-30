import Team from "@/model/Team";
import connectMongo from "./mongoConnect";
import { AddTeamInput } from "@/app/admin/teams/add-teams/page";

class TeamClass {
  async createBulkNewTeam(data: any[]) {
    // @ts-ignore
    const dbEntries = [];

    data.forEach((item) => {
      // [ '1', 'East Bengal', 'AB12', 'A', 'prannaykedia1@gmail.com' ],
      const row = {
        name: item[1],
        regId: item[2],
        teamCode: item[3],
        email: item[4],
      };
      dbEntries.push(row);
    });
    await connectMongo();
    // @ts-ignore-ignore
    const team = await Team.create(dbEntries)
      .then(() => true)
      .catch(() => false);

    return team;
  }

  async createNewTeam(data: AddTeamInput) {
    // {
    //   name: 'asd',
    //   regId: '123sd',
    //   teamCode: 'A',
    //   email: 'prannaykedia1@gmail.com'
    // }
    await connectMongo();
    console.log(data);
    const team = await Team.create(data)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });
    return team;
  }

  async getAllTeams() {
    await connectMongo();
    const team = await Team.find();
    return team;
  }

  async getTeamFromId(id: string) {
    await connectMongo();
    const team = await Team.findById(id);
    return team;
  }

  async getTeamPlayersFromId(id: string) {
    await connectMongo();
    const team = await Team.findById(id);
    return team.playersList;
  }
}

export default TeamClass;
