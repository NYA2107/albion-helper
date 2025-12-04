import z from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterType = z.infer<typeof RegisterFormSchema>;
