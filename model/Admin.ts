import { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for the Goal document
interface Admins extends Document {
  name: string;
  email: string;
  password: string;
  type: string; // Optional property
}

// Define the schema
const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "admin",
    // admin or super-admin
  },
});

// Create the model
const Admin = model<Admins>("Admin", adminSchema);

export default Admin;
