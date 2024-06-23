import { Document, Schema, model, models } from "mongoose";

export interface Users extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

const User = models?.User || model<Users>("User", userSchema);
export default User;
