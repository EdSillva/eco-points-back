import { z } from "zod";

export const createSustainableActionValidate = z.object({
  title: z.string().min(1, "Título não pode estar vazio."),
  description: z.string().min(1, "Descrição não pode estar vazia."),
  points: z.number().int().min(1, "Pontos devem ser maior que 0."),
});

export type CreateSustainableActionInput = z.infer<
  typeof createSustainableActionValidate
>;
