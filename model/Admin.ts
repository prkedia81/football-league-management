import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password_hash: {
        type: String,
        required: true,
      },
    } as const,
    { _id: false }
  )
);

const Session = mongoose.model(
  "Session",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      expires_at: {
        type: Date,
        required: true,
      },
    } as const,
    { _id: false }
  )
);

export const mongoAdapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
