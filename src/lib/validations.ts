import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres").max(255),
  email: z.string().email("Email inválido"),
  willAttend: z.boolean(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
