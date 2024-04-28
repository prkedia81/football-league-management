import { NormalMatchInputs } from "@/components/admin/finishMatch/normalMatch/NormalMatchForm";
import { Matches } from "@/model/Match";
import { finishNormalMatch } from "@/services/matches";
import { NextRequest } from "next/server";

interface Data {
  match: Matches;
  formData: NormalMatchInputs;
}

export async function POST(req: NextRequest) {
  try {
    const data: Data = await req.json();
    const resp = await finishNormalMatch(data.match, data.formData);
    if (resp) return Response.json({ message: "Success" }, { status: 201 });
    else return Response.json({ message: "Failed" }, { status: 500 });
  } catch (err) {
    return Response.error();
  }
}
