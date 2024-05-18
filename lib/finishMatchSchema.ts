import { optional, z } from "zod";

export const NormalMatchFormSchema = z.object({
  winner: z
    .string({ invalid_type_error: "Select a winner" })
    .min(1, "Select a winner"),
  // TODO: Change back to 11
  team1Starting11: z
    .array(z.string(), {
      invalid_type_error: "Select atleast 11 players in Playing XI",
    })
    .min(4, "Atleast 11 Players are required in playing XI"),
  team1Gk: z
    .array(z.string(), {
      invalid_type_error: "Select atleast 1 players as Goal Keeper",
    })
    .min(1, "Select atleast 1 players as Goal Keeper"),
  team1Captain: z.boolean().or(z.array(z.string())),
  team1Substitute: z.boolean().or(z.array(z.string())),
  team1Reserve: z.boolean().or(z.array(z.string())),
  // TODO: Change back to 11
  team2Starting11: z
    .array(z.string(), {
      invalid_type_error: "Select atleast 11 players in Playing XI",
    })
    .min(4, "Atleast 11 Players are required in playing XI"),
  team2Gk: z
    .array(z.string(), {
      invalid_type_error: "Select atleast 1 players as Goal Keeper",
    })
    .min(1, "Select atleast 1 players as Goal Keeper"),
  team2Captain: z.boolean().or(z.array(z.string())),
  team2Substitute: z.boolean().or(z.array(z.string())),
  team2Reserve: z.boolean().or(z.array(z.string())),
  goalsAgainstTeam1: z
    .string({
      invalid_type_error: "Enter the number of goals scored",
    })
    .min(1, "Enter the number of goals scored"),
  scorerAgainstTeam1: z.optional(
    z.array(
      z.object({
        id: z.string().min(1, "Select 1 Player"),
      })
    )
  ),
  goalsAgainstTeam2: z
    .string({
      invalid_type_error: "Enter the number of goals scored",
    })
    .min(1, "Enter the number of goals scored"),
  scorerAgainstTeam2: z.optional(
    z.array(
      z.object({
        id: z.string().min(1, "Select 1 Player"),
      })
    )
  ),
  numYellowCards: z
    .string({
      invalid_type_error: "Enter the number of goals scored",
    })
    .min(1, "Enter the number of goals scored"),
  numRedCards: z
    .string({
      invalid_type_error: "Enter the number of goals scored",
    })
    .min(1, "Enter the number of goals scored"),
  yellowCards: z.optional(
    z.array(
      z.object({
        id: z.string().min(1, "Select 1 Player"),
      })
    )
  ),
  redCards: z.optional(
    z.array(
      z.object({
        id: z.string().min(1, "Select 1 Player"),
      })
    )
  ),
  referee: z.string().min(1, "Add the referee name"),
  assistantReferee1: z.string().min(1, "Add assistant referee 1's name"),
  assistantReferee2: z.string().min(1, "Add assistant referee 2's name"),
  fourthReferee: z.string(),
  matchCommissioner: z.string(),
  refereeAssessor: z.string(),
  refereeReport: z
    .string()
    .min(1, { message: "Referee Report is required" })
    .url({ message: "Must be a valid url" }),
  remarks: z.string(),
});

export const WalkoverMatchSchema = z.object({
  winner: z.string().min(1, "Select a winner"),
  reason: z.string().min(1, "Select a reason"),
  deduction: z.string().min(1, "Choose the number of points to be deducted"),
  referee: z.string().min(1, "Add the referee name"),
  assistantReferee1: z.string().min(1, "Add the assistant referee 1's name"),
  assistantReferee2: z.string().min(1, "Add the assistant referee 2's name"),
  fourthReferee: z.string(),
  matchCommissioner: z.string(),
  refereeAssessor: z.string(),
  refereeReport: z
    .string()
    .min(1, { message: "Referee Report is required" })
    .url({ message: "Must be a valid url" }),
  remarks: z.string(),
});
