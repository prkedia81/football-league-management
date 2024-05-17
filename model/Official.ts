import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Player document
export interface Officials extends Document {
  name: string;
  regId?: string;
  teamId: string;
  position?: string;
  yellowCards: {
    matchId: string;
    number: number;
  }[];
  redCards: {
    matchId: string;
    number: number;
  }[];
}

// Define the schema
const officalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  regId: {
    type: String,
  },
  position: {
    type: String,
  },
  teamId: {
    type: String,
    required: true,
  },
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
});

// Create the model
// const Player = model<Players>("Player", playerSchema);
const Offical = models.Offical || model<Officials>("Offical", officalSchema);

export default Offical;
