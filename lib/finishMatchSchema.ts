import { optional, z } from "zod";

export const NormalMatchFormSchema = z.object({
  winner: z.string().min(1, "Select a winner"),
  // TODO: Change back to 11
  team1players: z
    .array(z.string())
    .min(3, "Atleast 14 players required in Playing Squad"),
  team1Starting11: z
    .array(z.string())
    .min(3, "Atleast 11 players required in Playing Squad"),
  team1Bench: z.string().or(z.array(z.string())),
  team2players: z
    .array(z.string())
    .min(3, "Atleast 11 players required in Playing Squad"),
  team2Starting11: z
    .array(z.string())
    .min(3, "Atleast 11 players required in Playing Squad"),
  team2Bench: z.string().or(z.array(z.string())),
  goalsAgainstTeam1: z.string(),
  scorerAgainstTeam1: z.optional(
    z.array(
      z.object({
        id: z.string(),
      })
    )
  ),
  goalsAgainstTeam2: z.string(),
  scorerAgainstTeam2: z.optional(
    z.array(
      z.object({
        id: z.string(),
      })
    )
  ),
  numYellowCards: z.optional(z.string()),
  yellowCards: z.optional(
    z.array(
      z.object({
        id: z.string(),
      })
    )
  ),
  redCards: z.optional(
    z.array(
      z.object({
        id: z.string(),
      })
    )
  ),
  referee: z.string().min(1, "Add the referee name"),
  assistantReferee1: z.string(),
  assistantReferee2: z.string(),
  fourthReferee: z.string(),
  matchCommissioner: z.string(),
  matchObserver: z.string(),
  refereeReport: z.optional(z.string().url()),
  remarks: z.string(),
});

export const WalkoverMatchSchema = z.object({
  winner: z.string().min(1, "Select a winner"),
  reason: z.string().min(1, "Select a reason"),
  deduction: z.string().min(1, "Choose the number of points to be deducted"),
  referee: z.string().min(1, "Add the referee name"),
  assistantReferee1: z.string(),
  assistantReferee2: z.string(),
  fourthReferee: z.string(),
  matchCommissioner: z.string(),
  matchObserver: z.string(),
  refereeReport: z.optional(z.string().url()),
  remarks: z.string(),
});
