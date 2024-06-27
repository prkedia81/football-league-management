import { z } from "zod";
import {
  NormalMatchFormSchema,
  PenaltyEditSchema,
  WalkoverMatchSchema,
} from "./finishMatchSchema";

export type NormalMatchInputs = z.infer<typeof NormalMatchFormSchema>;
export type WalkoverMatchInputs = z.infer<typeof WalkoverMatchSchema>;
export type PenaltyEditInputs = z.infer<typeof PenaltyEditSchema>;
