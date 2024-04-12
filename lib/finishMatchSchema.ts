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
  scorerAgainstTeam1: z.optional(z.array(z.string())),
  goalsAgainstTeam2: z
    .number({
      required_error: "Number of goals is required",
      invalid_type_error: "Number of goals must be a number",
    })
    .int(),
  scorerAgainstTeam2: z.optional(z.array(z.string())),
});
