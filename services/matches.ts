import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import connectMongo from "../lib/mongoConnect";
import Match, { Matches } from "@/model/Match";
import { formatMultiInputEntry } from "@/lib/utils";
import Team from "@/model/Team";
import Player from "@/model/Player";
import {
  changeMatchVenues,
  finishMatchInVenue,
  getVenueFromId,
  getVenueFromRegId,
} from "./venues";
import { NormalMatchInputs, WalkoverMatchInputs } from "@/lib/matchFormTypes";
import { getTeamFromId } from "./teams";

interface PlayerUpdate {
  playerId?: string;
  updates: {
    $push: { matchesPlayed: string };
    goals?: {
      matchId: string;
      number: number;
    };
    yellowCards?: {
      matchId: string;
      number: number;
    };
    redCards?: {
      matchId: string;
      number: number;
    };
  };
}

function formatInputForMatchCreate(data: AddMatchInputs) {
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
    dbEntries.push(formatInputForMatchCreate(row));
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
  const match = await Match.create(formatInputForMatchCreate(data))
    .then(() => true)
    .catch(() => false);
  return match;
}

export async function getAllMatches() {
  await connectMongo();
  const match = await Match.find().sort({ time: "ascending" });
  return match;
}

export async function getMatchFromId(id: string): Promise<Matches> {
  await connectMongo();
  const match = await Match.findById(id);
  return match;
}

export async function getSingleTeamMatch(
  teamId: string
): Promise<Matches[] | null> {
  try {
    await connectMongo();
    const match = await Match.find({
      $or: [{ "team1.teamId": teamId }, { "team2.teamId": teamId }],
    });
    return match;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function formatRefereesForMatchFinish(
  data: NormalMatchInputs | WalkoverMatchInputs
) {
  const referees = [
    {
      pos: "referee",
      name: data.referee,
    },
    {
      pos: "assistantReferee1",
      name: data.assistantReferee1,
    },
    {
      pos: "assistantReferee2",
      name: data.assistantReferee2,
    },
    {
      pos: "fourthReferee",
      name: data.fourthReferee,
    },
    {
      pos: "matchCommissioner",
      name: data.matchCommissioner,
    },
    {
      pos: "refereeAssessor",
      name: data.refereeAssessor,
    },
  ];
}

export async function finishNormalMatch(
  match: Matches,
  data: NormalMatchInputs
) {
  try {
    // const team1Squad = data.team1Starting11.concat(data.team1Substitute);
    // const team2Squad = data.team2Starting11.concat(data.team2Substitute);

    const team1Squad = data.team1Starting11.concat(
      data.team1Substitute.concat(data.team1Reserve)
    );
    const team2Squad = data.team2Starting11.concat(
      data.team2Substitute.concat(data.team2Reserve)
    );

    // In Match DB
    // S1: Update Result (result)
    // S2: Add all referee details in an array
    // S3: Add Remarks
    // S4: Update Team 1 Score
    // S5: Update Team 2 Score
    // S6: Update Squad
    // S7: Update Playing XI
    // S8: Update Bench
    // S9: Add all Yellow Cards
    // S10: Add all Red Cards
    // S11: Update all goals Team 1
    // S12: Update all goals Team 2
    const referees = formatRefereesForMatchFinish(data);
    await connectMongo();
    const updatedMatch = await Match.findByIdAndUpdate(
      match._id,
      {
        "team1.squad": team1Squad,
        "team1.playing11": data.team1Starting11,
        "team1.substitute": data.team1Substitute || [],
        "team1.bench": data.team1Reserve || [],
        "team1.goalKeeper": data.team1Gk || [],
        "team1.captain": data.team1Captain || [],
        "team1.goalsScored": formatMultiInputEntry(data.scorerAgainstTeam2),
        "team2.squad": team2Squad,
        "team2.playing11": data.team2Starting11,
        "team2.substitute": data.team2Substitute || [],
        "team2.bench": data.team2Reserve || [],
        "team2.goalKeeper": data.team2Gk || [],
        "team2.captain": data.team2Captain || [],
        "team2.goalsScored": formatMultiInputEntry(data.scorerAgainstTeam1),
        team1Score: data.goalsAgainstTeam2 || 0,
        team2Score: data.goalsAgainstTeam1 || 0,
        result: data.winner,
        remarks: data.remarks,
        redCards: formatMultiInputEntry(data.redCards),
        yellowCards: formatMultiInputEntry(data.yellowCards),
        refereeReport: data.refereeReport || "",
        referee: referees,
        status: "completed",
      },
      { new: true }
    );

    // In Team DB (for each team):
    // S1: Update goalsScoredFor
    // S2: Update goalsScoredAgainst
    // S3: Update match lost or won
    if (parseInt(data.winner) == 0) {
      const team1 = await Team.findByIdAndUpdate(match.team1.teamId, {
        $inc: {
          goalScoredFor: data.goalsAgainstTeam2,
          goalScoredAgainst: data.goalsAgainstTeam1,
          points: 1, // Points for draw
        },
        $push: {
          matchesPlayed: match._id,
          matchesDrawn: match._id,
        },
      });
      const team2 = await Team.findByIdAndUpdate(match.team2.teamId, {
        $inc: {
          goalScoredFor: data.goalsAgainstTeam1,
          goalScoredAgainst: data.goalsAgainstTeam2,
          points: 1, // Points for draw
        },
        $push: {
          matchesPlayed: match._id,
          matchesDrawn: match._id,
        },
      });
    } else if (parseInt(data.winner) == 1) {
      const team1 = await Team.findByIdAndUpdate(match.team1.teamId, {
        $inc: {
          goalScoredFor: data.goalsAgainstTeam2,
          goalScoredAgainst: data.goalsAgainstTeam1,
          points: 3, // Points for TEAM 1 winning
        },
        $push: {
          matchesPlayed: match._id,
          matchesWon: match._id,
        },
      });
      const team2 = await Team.findByIdAndUpdate(match.team2.teamId, {
        $inc: {
          goalScoredFor: data.goalsAgainstTeam1,
          goalScoredAgainst: data.goalsAgainstTeam2,
        },
        $push: {
          matchesPlayed: match._id,
          matchesLost: match._id,
        },
      });
    } else {
      const team1 = await Team.findByIdAndUpdate(match.team1.teamId, {
        $inc: {
          goalScoredFor: data.goalsAgainstTeam2,
          goalScoredAgainst: data.goalsAgainstTeam1,
        },
        $push: {
          matchesPlayed: match._id,
          matchesLost: match._id,
        },
      });
      const team2 = await Team.findByIdAndUpdate(match.team2.teamId, {
        $inc: {
          goalScoredFor: data.goalsAgainstTeam1,
          goalScoredAgainst: data.goalsAgainstTeam2,
          points: 3, // Points for TEAM 2 winning
        },
        $push: {
          matchesPlayed: match._id,
          matchesWon: match._id,
        },
      });
    }

    // In Player DB (for each player who scored a goal, got a red card or got a yellow card)
    // S1: Update all players who have goals
    // S2: Update all players who have yellow cards
    // S3: Update all players who have red cards
    const allPlayers = team1Squad.concat(team2Squad);
    const allPlayerUpdate: PlayerUpdate[] = [];
    allPlayers.forEach((player) => {
      const playerUpdate: PlayerUpdate = {
        playerId: player,
        updates: {
          $push: { matchesPlayed: match._id },
        },
      };
      // Goals
      const goals1 = data.scorerAgainstTeam2?.filter((p) => p.id === player);
      const goals2 = data.scorerAgainstTeam1?.filter((p) => p.id === player);

      if ((goals1 || goals2) && (goals1?.length != 0 || goals2?.length != 0)) {
        playerUpdate.updates.goals = {
          matchId: match._id,
          number: (goals1?.length || 0) + (goals2?.length || 0),
        };
      }

      // Yellow Cards
      const yellowCards = data.yellowCards?.filter((p) => p.id === player);

      if (yellowCards && yellowCards.length != 0) {
        playerUpdate.updates.yellowCards = {
          matchId: match._id,
          number: yellowCards.length,
        };
      }

      // Red Cards
      const redCards = data.redCards?.filter((p) => p.id === player);

      if (redCards && redCards.length != 0) {
        playerUpdate.updates.redCards = {
          matchId: match._id,
          number: redCards.length,
        };
      }

      allPlayerUpdate.push(playerUpdate);
    });

    const playersPromises = allPlayerUpdate
      .filter((playerUpdate) => Object.keys(playerUpdate.updates).length !== 0)
      .map(
        async (playerUpdate) =>
          await Player.findByIdAndUpdate(
            playerUpdate.playerId,
            playerUpdate.updates
          )
      );
    const players = await Promise.all(playersPromises);

    // Update Venue
    const venueResult = await finishMatchInVenue(
      match._id,
      match.venue.venueId
    );
    if (!venueResult) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function finishWalkoverMatch(
  match: Matches,
  data: WalkoverMatchInputs
) {
  try {
    // In Match DB
    // S1: Update Result (result)
    // S2: Add all referee details in an array
    // S3: Add Remarks
    // S4: Update Reason in result
    // S5: Update Referee Report

    // In Team DB (for each team):
    // S1: Update Penalty

    const referees = formatRefereesForMatchFinish(data);

    await connectMongo();
    if (parseInt(data.winner) == 1) {
      const updatedMatch = await Match.findByIdAndUpdate(
        match._id,
        {
          team1Score: 3,
          team2Score: 0,
          result: data.winner,
          remarks: data.remarks,
          refereeReport: data.refereeReport || "",
          referee: referees,
          status: data.reason,
        },
        { new: true }
      );

      const team1 = await Team.findByIdAndUpdate(match.team1.teamId, {
        $inc: {
          goalScoredFor: 3,
          points: 3, // Points for TEAM 1 winning
        },
        $push: {
          matchesPlayed: match._id,
          matchesWon: match._id,
        },
      });

      const updateTeamPenalty = await Team.findByIdAndUpdate(
        match.team2.teamId,
        {
          $inc: {
            points: -1 * parseInt(data.deduction), // Penalty for TEAM 2 walkover
          },
          $push: {
            penalty: {
              matchId: match._id,
              number: -1 * parseInt(data.deduction),
            },
            matchesPlayed: match._id,
            matchesLost: match._id,
          },
        }
      );
    } else {
      const updatedMatch = await Match.findByIdAndUpdate(
        match._id,
        {
          team1Score: 0,
          team2Score: 3,
          result: data.winner,
          remarks: data.remarks,
          refereeReport: data.refereeReport || "",
          referee: referees,
          status: data.reason,
        },
        { new: true }
      );

      const team2 = await Team.findByIdAndUpdate(match.team2.teamId, {
        $inc: {
          goalScoredFor: 3,
          points: 3, // Points for TEAM 2 winning
        },
        $push: {
          matchesPlayed: match._id,
          matchesWon: match._id,
        },
      });

      const updateTeamPenalty = await Team.findByIdAndUpdate(
        match.team1.teamId,
        {
          $inc: {
            points: -1 * parseInt(data.deduction), // Penalty for TEAM 1 walkover
          },
          $push: {
            penalty: {
              matchId: match._id,
              number: -1 * parseInt(data.deduction),
            },
            matchesPlayed: match._id,
            matchesLost: match._id,
          },
        }
      );
    }

    // Update Venue
    const venueResult = await finishMatchInVenue(
      match._id,
      match.venue.venueId
    );
    if (!venueResult) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function cancelMatch(id: string) {
  try {
    await connectMongo();
    const match = await getMatchFromId(id);
    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      {
        team1Score: 0,
        team2Score: 0,
        result: 0,
        remarks: "The match was cancelled",
        status: "cancelled",
      },
      { new: true }
    );

    const team1 = await Team.findByIdAndUpdate(match.team1.teamId, {
      $push: {
        matchesPlayed: match._id,
        matchesDrawn: match._id,
      },
    });

    const team2 = await Team.findByIdAndUpdate(match.team2.teamId, {
      $push: {
        matchesPlayed: match._id,
        matchesDrawn: match._id,
      },
    });

    // Update Venue
    const venueResult = await finishMatchInVenue(
      match._id,
      match.venue.venueId
    );
    if (!venueResult) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function rescheduleMatch(
  id: string,
  venueId: string,
  time: number
) {
  try {
    await connectMongo();
    const originalMatch = await getMatchFromId(id);
    const originalVenueRegId = originalMatch.venue.venueRegId;
    if (originalVenueRegId === venueId) {
      const updatedMatch = await Match.findByIdAndUpdate(
        id,
        {
          time: time,
        },
        { new: true }
      );
    } else {
      const resp = await changeMatchVenues(originalVenueRegId, venueId, id);
      const newVenue = await getVenueFromRegId(venueId);
      const updatedMatch = await Match.findByIdAndUpdate(
        id,
        {
          time: time,
          "venue.venueRegId": newVenue.regId,
          "venue.venueId": newVenue._id,
          "venue.venueName": newVenue.name,
        },
        { new: true }
      );
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editMatchPenalty(
  matchId: string,
  losingTeamId: string,
  deduction: string
) {
  try {
    await connectMongo();
    const losingTeam = await getTeamFromId(losingTeamId);
    if (!losingTeam) return false;
    const penalty = losingTeam.penalty;

    // Should not happen if the link is not there -> Malpractice with the code
    if (!penalty) return false;

    let oldPenalty = 0;
    for (let i = 0; i < penalty.length; i++) {
      if (matchId === penalty[i].matchId) oldPenalty = penalty[i].number;
    }

    oldPenalty = Math.abs(oldPenalty); // Take Absolute value
    const newPoints =
      (losingTeam.points || 0) + oldPenalty - parseInt(deduction);

    const updatedTeam = await Team.updateOne(
      { _id: losingTeamId, "penalty.matchId": matchId }, // Finding the document and the specific item in the array
      {
        $set: { "penalty.$.number": -1 * parseInt(deduction) },
        points: newPoints,
      },
      { new: true }
    ).exec();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
