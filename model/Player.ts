import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Player document
export interface Players extends Document {
  name: string;
  regId: string;
  teamId: string;
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
  regId: {
    type: String,
    required: true,
  },
  teamId: {
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
const Player = models.Player || model<Players>("Player", playerSchema);

export default Player;
