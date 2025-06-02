import { z } from "zod";
export const updateSustainableActionSchema = z.object({
    title: z.string().min(1, "Título não pode estar vazio."),
    description: z.string().min(1, "Descrição não pode estar vazia."),
});
export const updateSustainableActionParamsSchema = z.object({
    id: z.string().uuid("ID inválido."),
});
