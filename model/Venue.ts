import { Document, Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Venue document
interface Venues extends Document {
  name: string;
  regNumber?: string;
  email: string;
}

// Define the schema
const venueSchema = new Schema({
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
});

// Create the model
const Venue = models.Venue || model<Venues>("Venue", venueSchema);

export default Venue;
