import connectMongo from "./mongoConnect";
import Admin from "@/model/Admin";

export async function authenticate(email: string, password: string) {
  await connectMongo();
  const user = await Admin.findOne({ email, password });

  return user || null;
}
