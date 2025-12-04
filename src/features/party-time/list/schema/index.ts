import z from "zod";

export const PartySessionFormSchema = z.object({
  id: z.number().optional(),
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
  | (infer U)[]
  | undefined
  ? U
  : never;
