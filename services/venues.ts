import connectMongo from "./mongoConnect";
import Venue, { Venues } from "@/model/Venue";
import { AddVenueInput } from "@/app/admin/venues/add-venues/page";
import { getMatchFromId, updateVenueAllMatchFixtures } from "./matches";
import Match from "@/model/Match";

export async function createBulkNewVenue(data: any[]) {
  // @ts-ignore
  const dbEntries = [];

  data.forEach((item) => {
    // [ '1', 'Salt Lake Stadium', 'SA12', 'prannaykedia1@gmail.com' ],
    const row = {
      name: item[1],
      regId: item[2],
      email: item[3],
    };
    dbEntries.push(row);
  });

  await connectMongo();
  try {
    // @ts-ignore-ignore
    const venues = await Venue.create(dbEntries).catch((err) => {
      console.log(err);
      throw Error(err);
    });

    // Check if the particular venueCode has any matches and add to that
    venues.forEach((venue: Venues) => {
      updateVenueAllMatchFixtures(venue._id, venue.regId || "", venue.name);
      addAllMatchToVenue(venue.regId || "");
    });

    return true;
  } catch (err) {
    return false;
  }
}

export async function createNewVenue(data: AddVenueInput) {
  // {
  //   name: 'Salt Lake Stadium',
  //   regId: 'SA12',
  //   email: 'prannaykedia1@gmail.com'
  // }
  await connectMongo();
  try {
    const venue = await Venue.create(data).catch((err) => {
      console.log(err);
      throw Error(err);
    });

    // Check if the particular venueCode has any matches and add to that
    updateVenueAllMatchFixtures(venue._id, venue.regId, venue.name);
    addAllMatchToVenue(venue.regId);
    return true;
  } catch (err) {
    return false;
  }
}

export async function addAllMatchToVenue(venueRegId: string) {
  await connectMongo();

  const matches = await Match.find({
    "venue.venueRegId": venueRegId,
  });
  matches.forEach(
    async (match) =>
      await Venue.findOneAndUpdate(
        {
          regId: venueRegId,
        },
        {
          $addToSet: { matchesScheduled: match._id },
        }
      )
  );
}

export async function getAllVenues() {
  await connectMongo();
  const venue = await Venue.find();
  return venue;
}

export async function getVenueFromId(id: string): Promise<Venues> {
  await connectMongo();
  const venue = await Venue.findById(id);
  return venue;
}

export async function checkSchedulingConflict(
  id: string,
  matchTime: number
): Promise<boolean> {
  const venue = await getVenueFromId(id);
  const scheduledMatch = venue.matchesScheduled;
  let flag = false;
  for (let i = 0; i < scheduledMatch.length; i++) {
    const matchId = scheduledMatch[i];
    const match = await getMatchFromId(matchId);
    const scheduledTime = match.time;

    // Calculate the difference in milliseconds
    const diffInMilliseconds = Math.abs(scheduledTime - matchTime);

    // Convert milliseconds to minutes
    const diffInMinutes = diffInMilliseconds / (1000 * 60);

    // confirm atleast a difference of 180 minutes = 3 hours
    if (diffInMinutes <= 180) {
      console.log("In here");
      flag = true;
      break;
    }
  }
  return flag;
}
