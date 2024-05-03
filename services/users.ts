import User, { Users } from "@/model/User";
import connectMongo from "./mongoConnect";

export async function getUserFromDb(email: string): Promise<Users> {
  await connectMongo();
  const user = await User.findOne({ email: email.trim() });
  return user;
}

export async function checkIfUserExists(email: string): Promise<boolean> {
  const user = await User.findOne({ email });
  if (user) return true;
  return false;
}

export async function signUpUser(
  name: string,
  email: string,
  password: string
): Promise<boolean> {
  await connectMongo();
  const newUser = await User.create({
    name,
    email,
    password,
    role: "admin",
  });
  if (newUser) return true;

  return false;
}
