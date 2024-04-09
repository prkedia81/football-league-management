import Admin from "@/model/Admin";
import connectMongo from "@/services/mongoConnect";
import { NextApiRequest, NextApiResponse } from "next";

interface AdminDocument {
 _id: string;
 email: string;
}

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse<AdminDocument | { error: string }>
) {
 try {
    await connectMongo();
    const { email } = req.body; // Assuming you're sending JSON in the body
    const admin = await Admin.findOne({ email }).select("_id");
    console.log("ID: ", admin); //just checking
    if (admin) {
      res.status(200);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
 }
}

