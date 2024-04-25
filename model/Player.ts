import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Player document
export interface Players extends Document {
  name: string;
  regId: string;
  teamId: string;
  goals: {
    matchId: string;
    number: number;
  }[];
  yellowCards: {
    matchId: string;
    number: number;
  }[];
  redCards: {
    matchId: string;
    number: number;
  }[];
  matchesPlayed: string[];
}

// Define the schema
const playerSchema = new Schema({
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

// Create the model
// const Player = model<Players>("Player", playerSchema);
const Player = models.Player || model<Players>("Player", playerSchema);

export default Player;
