import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Venue document
export interface Venues extends Document {
  name: string;
  regId?: string;
  email: string;
  matchesScheduled: string[];
  matchesPlayed: string[];
}

// Define the schema
const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  regId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  matchesScheduled: [
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
});

// Create the model
const Venue = models.Venue || model<Venues>("Venue", venueSchema);

export default Venue;
