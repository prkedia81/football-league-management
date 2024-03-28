import { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for the Team document
interface Teams extends Document {
  name: string;
  email: string;
  teamCode: string;
  regNumber: string;
  goalScoredFor: number;
  goalScoredAgainst: number;
  matchesWon: string[];
  matchesLost: string[];
  matchesDrawn: string[];
  matchesPlayed?: string[];
  abandonPenalty?: {
    matchId: string;
    amount: number;
  }[];
  playerList: number[];
}

// Define the schema
const teamSchema = new Schema({
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
  },
  regNumber: {
    type: String,
    required: true,
  },
  goalScoredFor: {
    type: Number,
    default: [],
  },
  goalScoredAgainst: {
    type: Number,
    default: [],
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
    },
  ],
  abandonPenalty: [
    {
      matchId: String,
      amount: Number,
    },
  ],
  playerList: [
    {
      type: Number,
      default: [],
    },
  ],
});

// Create the model
const Team = model<Teams>("Team", teamSchema);

export default Team;
