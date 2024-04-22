import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import connectMongo from "./mongoConnect";
import Match, { Matches } from "@/model/Match";

function formatInputForDb(data: AddMatchInputs) {
  // {
  //     team1Id: 'asd',
  //     team2Id: 'asd',
  //     date: 2024-03-30T18:30:00.000Z,
  //     time: '00:00',
  //     location: 'asd'
  //   }

  const time = new Date(data.date);
  const [hour, min] = data.time.split(":");
  time.setHours(parseInt(hour));
  time.setMinutes(parseInt(min));

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
    time: time.getTime(),
    // Get venue from ID
    venue: { venueRegId: data.location },
  };
}

export async function updateTeamAllMatchFixtures(
  teamCode: string,
  teamId: string,
  teamName: string
) {
  await connectMongo();

  // Team 1:
  const matches1 = await Match.find({
    "team1.teamCode": teamCode,
  });

  matches1.forEach(async (match) => {
    const updatedMatch = await Match.findOneAndUpdate(
      { _id: match._id },
      { "team1.teamName": teamName, "team1.teamId": teamId }
    );
  });

  // Team 2:
  const matches2 = await Match.find({
    "team2.teamCode": teamCode,
  });

  matches2.forEach(async (match) => {
    const updatedMatch = await Match.findOneAndUpdate(
      { _id: match._id },
      { "team2.teamName": teamName, "team2.teamId": teamId }
    );
  });
}

export async function updateVenueAllMatchFixtures(
  venueId: string,
  venueRegId: string,
  venueName: string
) {
  await connectMongo();

  const updatedMatch = await Match.findOneAndUpdate(
    { venue: { venueRegId: venueRegId } },
    {
      venue: {
        venueRegId: venueRegId,
        venueName: venueName,
        venueId: venueId,
      },
    }
  );
}

export async function createBulkNewMatch(data: any[]) {
  // @ts-ignore
  const dbEntries = [];

  data.forEach((item) => {
    // [ '1', 'A', 'E', '1/2/23', '07:00', 'Rabindra Sarovar Stadium' ],
    if (item.length == 0) return;
    const row = {
      team1Id: item[1],
      team2Id: item[2],
      date: item[3],
      time: item[4],
      location: item[5],
    };
    dbEntries.push(formatInputForDb(row));
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

export async function createNewMatch(data: AddMatchInputs) {
  await connectMongo();
  const match = await Match.create(formatInputForDb(data))
    .then(() => true)
    .catch(() => false);
  return match;
}

export async function getAllMatches() {
  await connectMongo();
  const match = await Match.find();
  return match;
}

export async function getMatchFromId(id: string) {
  await connectMongo();
  const match = await Match.findById(id);
  return match;
}
