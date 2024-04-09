import Admin from "@/model/Admin";
import { NextResponse } from "next/server";
import connectMongo from "@/services/mongoConnect";
// import bcrypt from "bcryptjs";

interface AdminRequestBody {
 name: string;
 email: string;
 password: string;
}

export async function POST(req: { json: () => Promise<AdminRequestBody> }) {
 try {
    const { name, email, password } = await req.json();
    // const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongo();
    await Admin.create({ name, email, password: password });

    return NextResponse.json({ message: "Admin registered." }, { status: 201 });
 } catch (error: any) {
    return NextResponse.json(
      { message: "An error occurred while registering the Admin." },
      { status: 500 }
    );
 }
}
