import { z } from "zod";

export const NormalMatchFormSchema = z.object({
  winner: z.string().min(1, "Select a winner"),
  // TODO: Change back to 11
  team1players: z
    .array(z.string())
    .min(3, "Atleast 11 players required in Playing Squad"),
  team2players: z
    .array(z.string())
    .min(3, "Atleast 11 players required in Playing Squad"),
  goalsAgainstTeam1: z.string(),
  scorerAgainstTeam1: z.optional(
    z.array(
      z.object({
        goal: z.string(),
      })
    )
  ),
  goalsAgainstTeam2: z.string(),
  scorerAgainstTeam2: z.optional(
    z.array(
      z.object({
        goal: z.string(),
      })
    )
  ),
  yellowCards: z.optional(
    z.array(
      z.object({
        yellowCard: z.string(),
      })
    )
  ),
  redCards: z.optional(
    z.array(
      z.object({
        redCard: z.string(),
      })
    )
  ),
  referee: z.string().min(1, "Add the referee name"),
  lineJudge: z.string(),
  umpire: z.string(),
  backJudge: z.string(),
  sideJudge: z.string(),
  fieldJudge: z.string(),
  remarks: z.string(),
});