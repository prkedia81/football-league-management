import { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for the Player document
interface Players extends Document {
  name: string;
  regNumber: string;
  goal: string[];
  yellowCards: {
    matchId: string;
    amount: number;
  }[];
  redCards: {
    matchId: string;
    amount: number;
  }[];
  matchesPlayed: string[];
}

// Define the schema
const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  regNumber: {
    type: String,
    required: true,
  },
  goal: [
    {
      type: String,
      default: 0,
    },
  ],
  yellowCards: [
    {
      matchId: String,
      amount: Number,
    },
  ],
  redCards: [
    {
      matchId: String,
      amount: Number,
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
const Player = model<Players>("Player", playerSchema);

export default Player;
