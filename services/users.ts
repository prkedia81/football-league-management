import User, { Users } from "@/model/User";
import connectMongo from "../lib/mongoConnect";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/lib/signInSchema";
import { ZodError } from "zod";
import { signIn } from "@/auth";

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

export async function signUp(formData: FormData) {
  try {
    const SALT_ROUNDS = 10;
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { name, email, password } = await signUpSchema.parseAsync(data);
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    const newUser = await addUserToDb(name, email, hash);
    if (newUser) {
      const resp = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/admin",
      });
      // console.log(resp);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return null;
    }
    return null;
  }
}

export async function addUserToDb(
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
