import { signIn } from "@/auth";
import { NextRequest } from "next/server";

interface Data {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Data = await req.json();
    const resp = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (resp) return Response.json({ message: "Success" }, { status: 201 });
    else return Response.json({ message: "Failed" }, { status: 500 });
  } catch (error) {
    return Response.json({ message: "Failed" }, { status: 500 });
  }
}
