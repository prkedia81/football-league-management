import { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for the Referee document
interface Referees extends Document {
  name: string;
  regNumber?: string;
  email: string;
  position?: string; // Optional property
}

// Define the schema
const refereeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  regNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    // Might remove this
  },
});

// Create the model
const Referee = model<Referees>("Referee", refereeSchema);

export default Referee;
