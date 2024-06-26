import { Document, Schema, model, models } from "mongoose";

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
  points: number;
  penalty?: {
    matchId: string;
    number: number;
  }[];
  playerList: string[];
  officialList: string[];
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

// teamSchema.index({ regId: 1, teamCode: 1 }, { unique: true });
// Create the model
const Team = models.Team || model<Teams>("Team", teamSchema);

export default Team;
