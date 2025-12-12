import type { PlayerType } from "@/features/players/schema";
import z from "zod";

export const PartySessionFormSchema = z.object({
  id: z.number().optional(),
  user_id: z.string().optional(),
  name: z.string().min(2),
  state: z
    .union([z.literal("Active"), z.literal("Paused"), z.literal("Stopped")])
    .optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  logs: z
    .array(
      z.object({
        id: z.number(),
        type: z.union([z.literal("Player"), z.literal("Session")]),
        name: z.string(),
        state: z.union([
          z.literal("Active"),
          z.literal("Paused"),
          z.literal("Stopped"),
          z.literal("On Break"),
          z.literal("Left"),
        ]),
        timeStamp: z.number(),
      })
    )
    .optional(),
});

export type PartySessionType = z.infer<typeof PartySessionFormSchema>;

export type SessionLogsType = PartySessionType["logs"] extends
  | Array<infer U>
  | undefined
  ? U
  : never;

export interface PlayerLogsType {
  state: "Active" | "On Break" | "Left" | "Paused";
  timeStamp: number;
}

export const PlayerSessionFormSchema = z.object({
  player_id: z.number(),
  party_session_id: z.number(),
  state: z.custom<PlayerLogsType["state"]>(),
  logs: z.array(z.custom<PlayerLogsType>()),
});

export type PlayerSessionFormType = z.infer<typeof PlayerSessionFormSchema>;
export type PlayerSessionType = Omit<PlayerSessionFormType, "player_id"> & {
  player_id: PlayerType;
};
