import { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for the Goal document
interface Goals extends Document {
  matchId: string;
  teamScoredBy: string;
  teamScoredAgainst: string;
  playerScored?: string; // Optional property
}

// Define the schema
const goalSchema = new Schema({
  matchId: {
    type: String,
    required: true,
  },
  teamScoredBy: {
    type: String,
    required: true,
  },
  teamScoredAgainst: {
    type: String,
    required: true,
  },
  playerScored: {
    type: String,
    // Not required when abandoned etc... Added without player ID
  },
});

// Create the model
const Goal = model<Goals>("Goal", goalSchema);

export default Goal;
