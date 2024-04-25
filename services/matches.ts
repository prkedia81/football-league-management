import { AddMatchInputs } from "@/app/admin/match/add-fixtures/page";
import connectMongo from "./mongoConnect";
import Match, { Matches } from "@/model/Match";
import { NormalMatchInputs } from "@/components/admin/finishMatch/normalMatch/NormalMatchForm";
import { formatMultiInputEntry } from "@/lib/utils";
import Team from "@/model/Team";
import Player from "@/model/Player";
import { getVenueFromId } from "./venues";
import Venue, { Venues } from "@/model/Venue";
import { WalkoverMatchInputs } from "@/components/admin/finishMatch/walkover/WalkoverMultiForm";

interface PlayerUpdate {
  playerId?: string;
  updates: {
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
  const match = await Match.find();
  return match;
}

export async function getMatchFromId(id: string) {
  await connectMongo();
  const match = await Match.findById(id);
  return match;
}

export async function finishNormalMatch(
  match: Matches,
  data: NormalMatchInputs
) {
  try {
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

    const referees = [
      {
        pos: "referee",
        name: data.referee,
      },
      {
        pos: "lineJudge",
        name: data.lineJudge,
      },
      {
        pos: "umpire",
        name: data.umpire,
      },
      {
        pos: "backJudge",
        name: data.backJudge,
      },
      {
        pos: "sideJudge",
        name: data.sideJudge,
      },
      {
        pos: "fieldJudge",
        name: data.fieldJudge,
      },
    ];

    await connectMongo();
    const updatedMatch = await Match.findByIdAndUpdate(
      match._id,
      {
        "team1.squad": data.team1players,
        "team1.playing11": data.team1Starting11,
        "team1.bench": data.team1Bench || [],
        "team1.goalsScored": formatMultiInputEntry(data.scorerAgainstTeam2),
        "team2.squad": data.team2players,
        "team2.playing11": data.team2Starting11,
        "team2.bench": data.team2Bench || [],
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
    const allPlayers = data.team1players.concat(data.team2players);
    const allPlayerUpdate: PlayerUpdate[] = [];
    allPlayers.forEach((player) => {
      const playerUpdate: PlayerUpdate = {
        playerId: player,
        updates: {},
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

    // In Venue DB
    // S1: Remove match from Match Scheduled
    // S2: Push the match to match played
    const venue = await getVenueFromId(match.venue.venueId);
    const matchesScheduled = venue.matchesScheduled.filter(
      (m) => m != match._id
    );
    const updatedVenue = await Venue.findByIdAndUpdate(match.venue.venueId, {
      matchesScheduled: matchesScheduled,
      $push: { matchesPlayed: match._id },
    });

    return true;
  } catch (err) {
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

    const referees = [
      {
        pos: "referee",
        name: data.referee,
      },
      {
        pos: "lineJudge",
        name: data.lineJudge,
      },
      {
        pos: "umpire",
        name: data.umpire,
      },
      {
        pos: "backJudge",
        name: data.backJudge,
      },
      {
        pos: "sideJudge",
        name: data.sideJudge,
      },
      {
        pos: "fieldJudge",
        name: data.fieldJudge,
      },
    ];

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
        $push: {
          matchesPlayed: match._id,
          matchesWon: match._id,
        },
      });

      const updateTeamPenalty = await Team.findByIdAndUpdate(
        match.team2.teamId,
        {
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

      const team1 = await Team.findByIdAndUpdate(match.team2.teamId, {
        $push: {
          matchesPlayed: match._id,
          matchesWon: match._id,
        },
      });

      const updateTeamPenalty = await Team.findByIdAndUpdate(
        match.team1.teamId,
        {
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

    // In Venue DB
    // S1: Remove match from Match Scheduled
    // S2: Push the match to match played
    const venue = await getVenueFromId(match.venue.venueId);
    const matchesScheduled = venue.matchesScheduled.filter(
      (m) => m != match._id
    );
    const updatedVenue = await Venue.findByIdAndUpdate(match.venue.venueId, {
      matchesScheduled: matchesScheduled,
      $push: { matchesPlayed: match._id },
    });

    return true;
  } catch (err) {
    return false;
  }
}
