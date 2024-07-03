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

async function updateDb() {
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

updateDb();
