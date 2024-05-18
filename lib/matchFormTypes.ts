import { z } from "zod";
import {
  NormalMatchFormSchema,
  WalkoverMatchSchema,
} from "./finishMatchSchema";

export type NormalMatchInputs = z.infer<typeof NormalMatchFormSchema>;
export type WalkoverMatchInputs = z.infer<typeof WalkoverMatchSchema>;
