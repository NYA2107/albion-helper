import z from "zod";

export const PlayerFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2),
  description: z.string().optional(),
  tags: z.array(z.string()).min(2),
  createdAt: z.string().optional(),
});

export type PlayerType = z.infer<typeof PlayerFormSchema>;
