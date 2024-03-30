import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import connectMongo from "./mongoConnect";
import Match, { Matches } from "@/model/Match";

class MatchClass {
  formatInputForDb(data: AddMatchInputs) {
    // {
    //     team1Id: 'asd',
    //     team2Id: 'asd',
    //     date: 2024-03-30T18:30:00.000Z,
    //     time: 'asd',
    //     location: 'asd'
    //   }

    return {
      team1: {
        teamCode: data.team1Id,
      },
      team2: {
        teamCode: data.team2Id,
      },
      team1Score: 0,
      team2Score: 0,
      result: -1,
      // TODO: Add time
      time: new Date(data.date).getTime(),
      // Get venue from ID
      venue: { venueRegId: data.location },
    };
  }

  async createBulkNewMatch(data: any[]) {
    // @ts-ignore
    const dbEntries = [];

    data.forEach((item) => {
      // [ '1', 'A', 'E', '1/2/23', '7:00 PM', 'Rabindra Sarovar Stadium' ],
      const row = {
        team1Id: item[1],
        team2Id: item[2],
        date: item[3],
        time: item[4],
        location: item[5],
      };
      dbEntries.push(this.formatInputForDb(row));
    });
    await connectMongo();
    // @ts-ignore-ignore
    const match = await Match.create(dbEntries)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });

    return match;
  }

  async createNewMatch(data: AddMatchInputs) {
    await connectMongo();
    const match = await Match.create(this.formatInputForDb(data))
      .then(() => true)
      .catch(() => false);
    return match;
  }

  async getAllMatches() {
    await connectMongo();
    const match = await Match.find();
    return match;
  }

  async getMatchFromId(id: string) {
    await connectMongo();
    const match = await Match.findById(id);
    return match;
  }
}

export default MatchClass;
