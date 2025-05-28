import { z } from "zod";

export const createRewardSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  points_required: z.number().positive("Pontos devem ser positivos"),
  stock: z.number().int().nonnegative("Estoque não pode ser negativo"),
});

export type CreateRewardInput = z.infer<typeof createRewardSchema>;
