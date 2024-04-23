import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
  console.log(req.body);
}
