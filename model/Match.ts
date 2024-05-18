import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Match document
export interface Matches extends Document {
  team1: {
    teamCode: string;
    teamId?: string;
    teamName?: string;
    goalsScored?: string[];
    squad?: string[];
    playing11?: string[];
    goalKeeper?: string[];
    captain?: string[];
    substitute?: string[];
    bench?: string[];
  };
  team2: {
    teamCode: string;
    teamId?: string;
    teamName?: string;
    goalsScored?: string[];
    squad?: string[];
    playing11?: string[];
    goalKeeper?: string[];
    captain?: string[];
    substitute?: string[];
    bench?: string[];
  };
  team1Score: number;
  team2Score: number;
  result: number;
  time: number;
  status: string;
  venue: {
    venueRegId: string;
    venueId: string;
    venueName: string;
  };
  referee?: {
    pos: string;
    name: string;
  }[];
  refereeReport?: string;
  remarks?: string;
  redCards?: string[];
  yellowCards?: string[];
  penalty?: {
    teamId: string;
    number: number;
  };
}

// Define the schema
const matchSchema = new Schema({
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

// Create the model
const Match = models.Match || model<Matches>("Match", matchSchema);

export default Match;
