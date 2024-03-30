import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Match document
export interface Matches extends Document {
  team1: {
    teamCode: string;
    teamId?: string;
    teamName?: string;
    goalsScored?: string[];
    players?: string[];
  };
  team2: {
    teamCode: string;
    teamId?: string;
    teamName?: string;
    goalsScored?: string[];
    players?: string[];
  };
  team1Score: number;
  team2Score: number;
  result: number;
  time: number;
  status: string;
  venue: {
    venueRegId: string;
    venueName: string;
  };
  referee?: {
    position: string;
    refereeId: string;
  }[];
  refereeReport?: string;
  remarks?: string;
}

// Define the schema
const matchSchema = new Schema({
  team1: {
    teamCode: { type: String, required: true },
    teamId: String,
    teamName: String,
    goalsScored: [{ type: String }],
    players: [{ type: String }],
  },
  team2: {
    teamCode: { type: String, required: true },
    teamId: String,
    teamName: String,
    goalsScored: [{ type: String }],
    players: [{ type: String }],
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
    venueName: { type: String, required: false },
  },
  referee: [
    {
      position: String,
      refereeId: String,
    },
  ],
  refereeReport: String,
  remarks: String,
});

// Create the model
const Match = models.Match || model<Matches>("Match", matchSchema);

export default Match;
