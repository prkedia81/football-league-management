import { NormalMatchInputs } from "@/lib/matchFormTypes";
import { Matches } from "@/model/Match";
import { editMatchPenalty, finishNormalMatch } from "@/services/matches";
import { NextRequest } from "next/server";

interface Data {
  matchId: string;
  deduction: string;
  losingTeamId: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Data = await req.json();
    const resp = await editMatchPenalty(
      data.matchId,
      data.losingTeamId,
      data.deduction
    );
    if (resp) return Response.json({ message: "Success" }, { status: 201 });
    else return Response.json({ message: "Failed" }, { status: 500 });
  } catch (err) {
    return Response.error();
  }
}
