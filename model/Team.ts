import { Document, Schema, model, models } from "mongoose";

// TODO: Fix unique issue
// Define the TypeScript interface for the Team document
export interface Teams extends Document {
  name: string;
  email: string;
  teamCode: string;
  regId: string;
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
  playerList: string[];
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
      type: String,
      default: [],
    },
  ],
});

// teamSchema.index({ regId: 1, teamCode: 1 }, { unique: true });
// Create the model
const Team = models.Team || model<Teams>("Team", teamSchema);

export default Team;
