const mongoose = require("mongoose");

// Define the schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regId: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  goals: [
    {
      matchId: String,
      number: Number,
    },
  ],
  yellowCards: [
    {
      matchId: String,
      number: Number,
    },
  ],
  redCards: [
    {
      matchId: String,
      number: Number,
    },
  ],
  matchesPlayed: [
    {
      type: String,
      default: [],
    },
  ],
});

// Define the schema
const matchSchema = new mongoose.Schema({
  team1: {
    teamCode: { type: String, required: true },
    teamId: String,
    teamName: String,
    goalsScored: [{ type: String }],
    squad: [{ type: String }],
    playing11: [{ type: String }],
    goalKeeper: [{ type: String }],
    captain: [{ type: String }],
    substitute: [{ type: String }],
    bench: [{ type: String }],
  },
  team2: {
    teamCode: { type: String, required: true },
    teamId: String,
    teamName: String,
    goalsScored: [{ type: String }],
    squad: [{ type: String }],
    playing11: [{ type: String }],
    goalKeeper: [{ type: String }],
    captain: [{ type: String }],
    substitute: [{ type: String }],
    bench: [{ type: String }],
  },
  team1Score: {
    type: Number,
    default: 0,
  },
  team2Score: {
    type: Number,
    default: 0,
  },
  result: {
    // 0 - draw, 1 - team 1, 2 - team 2
    type: Number,
    default: -1,
  },
  status: {
    type: String,
    default: "unplayed",
  },
  time: {
    type: Number,
    required: true,
  },
  venue: {
    venueRegId: { type: String, required: true },
    venueId: { type: String, required: false },
    venueName: { type: String, required: false },
  },
  referee: [
    {
      pos: String,
      name: String,
    },
  ],
  refereeReport: String,
  remarks: String,
  redCards: [String],
  yellowCards: [String],
  penalty: {
    teamId: String,
    number: Number,
  },
});

// Define the schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  teamCode: {
    type: String,
    required: true,
    unique: true,
  },
  regId: {
    type: String,
    required: true,
  },
  goalScoredFor: {
    type: Number,
    default: 0,
  },
  goalScoredAgainst: {
    type: Number,
    default: 0,
  },
  matchesWon: [
    {
      type: String,
      default: [],
    },
  ],
  matchesLost: [
    {
      type: String,
      default: [],
    },
  ],
  matchesDrawn: [
    {
      type: String,
      default: [],
    },
  ],
  matchesPlayed: [
    {
      type: String,
      default: [],
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  penalty: [
    {
      matchId: String,
      number: Number,
    },
  ],
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

function convertToTitleCase(str) {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => {
      // Capitalize the first letter and make the rest lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" "); // Join all the words back together with spaces
}

async function exchangePlayerNameAndRegId() {
  await mongoose.connect("");
  const players = await Player.find({
    teamId: { $nin: ["6685525a5d262cd5af5384b8", "6685525a5d262cd5af5384c3"] },
  });
  // 57 + 276 = 333
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const name = convertToTitleCase(player.regId);
    const id = player.name.toUpperCase();

    const updatedPlayer = await Player.findByIdAndUpdate(
      player._id,
      {
        name: name,
        regId: id,
      },
      { new: true }
    );
    console.log(i, updatedPlayer._id, updatedPlayer.name, updatedPlayer.regId);
  }
}

async function numberMatchesByTeam(teamId) {
  await mongoose.connect(
    "mongodb+srv://prannaykedia:Prannay1234@prannay.etihv4g.mongodb.net/cfl-premier-24?retryWrites=true&w=majority"
  );

  const team = await Team.findById(teamId);
  return team.matchesPlayed.length;
}

async function makeMatchesPlayedSetInPlayers() {
  await mongoose.connect("");
  const players = await Player.find();
  const moreThan1Match = players.filter(
    (player) => player.matchesPlayed.length > 1
  );
  moreThan1Match.forEach(async (player) => {
    const oldMatchesPlayed = player.matchesPlayed;
    const matchesPlayedSet = new Set(oldMatchesPlayed);
    const newMatchesPlayed = Array.from(matchesPlayedSet);
    const updatedPlayer = await Player.findByIdAndUpdate(
      player._id,
      {
        matchesPlayed: newMatchesPlayed,
      },
      { new: true }
    );
    console.log(
      player._id,
      oldMatchesPlayed.length,
      updatedPlayer.matchesPlayed.length
    );
  });
}

updateDb();
