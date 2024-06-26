import connectMongo from "../lib/mongoConnect";
import Venue, { Venues } from "@/model/Venue";
import { AddVenueInput } from "@/app/admin/venues/add-venues/page";
import { getMatchFromId, updateVenueInAllMatchFixtures } from "./matches";
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
    const venues = await Venue.create(dbEntries)
      .then(() => console.log("Uploaded Venues"))
      .catch((err) => {
        console.log(err);
        throw Error(err);
      });

    // Check if the particular venueCode has any matches and add to that
    // venues.forEach((venue: Venues) => {
    //   updateVenueInAllMatchFixtures(venue._id, venue.regId || "", venue.name);
    //   addAllMatchToVenue(venue.regId || "");
    // });
    const result = await updateAllVenueInMatch()
      .then(() => true)
      .catch(() => false);

    return result;
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
    await updateAllVenueInMatch();
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateAllVenueInMatch() {
  const venues = await Venue.find();

  const allPromises = [];
  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i];
    const matchUpdatePromise = updateVenueInAllMatchFixtures(
      venue._id,
      venue.regId || "",
      venue.name
    );

    const venueMatchUpdatePromise = addAllMatchToVenue(venue.regId || "");

    allPromises.push(matchUpdatePromise);
    allPromises.push(venueMatchUpdatePromise);
  }

  // Wait for all promises to resolve
  await Promise.all(allPromises);
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

export async function getAllVenues(): Promise<Venues[]> {
  await connectMongo();
  const venue = await Venue.find();
  return venue;
}

export async function getVenueFromId(id: string): Promise<Venues | null> {
  try {
    await connectMongo();
    const venue = await Venue.findById(id);
    return venue;
  } catch (err) {
    return null;
  }
}

export async function getVenueFromRegId(id: string): Promise<Venues> {
  await connectMongo();
  const venue = await Venue.findOne({ regId: id });
  return venue;
}

export async function checkSchedulingConflict(
  id: string,
  matchTime: number
): Promise<boolean> {
  const venue = await getVenueFromRegId(id);
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

    // confirm atleast a difference of 240 minutes from both ends = 4 hours
    if (diffInMinutes <= 240) {
      flag = true;
      break;
    }
  }
  return flag;
}

export async function changeMatchVenues(
  oldVenueId: string,
  newVenueId: string,
  matchId: string
) {
  try {
    const oldVenue = await Venue.findOneAndUpdate(
      { regId: oldVenueId },
      { $pull: { matchesScheduled: matchId } }
    );
    const newVenue = await Venue.findOneAndUpdate(
      { regId: newVenueId },
      { $push: { matchesScheduled: matchId } }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function finishMatchInVenue(matchId: string, venueId: string) {
  // In Venue DB
  // S1: Remove match from Match Scheduled
  // S2: Push the match to match played
  try {
    const venue = await getVenueFromId(venueId);
    if (venue == null) return false;
    const matchesScheduled = venue.matchesScheduled.filter((m) => m != matchId);
    const updatedVenue = await Venue.findByIdAndUpdate(venueId, {
      matchesScheduled: matchesScheduled,
      $push: { matchesPlayed: matchId },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
