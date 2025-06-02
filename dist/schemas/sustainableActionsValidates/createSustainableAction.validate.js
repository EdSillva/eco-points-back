import { z } from "zod";
export const createSustainableActionValidate = z.object({
    title: z.string().min(1, "Título não pode estar vazio."),
    description: z.string().min(1, "Descrição não pode estar vazia."),
    image_url: z.string().url("URL da imagem inválida."),
    date_performed: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Data inválida. Use o formato ISO 8601."),
    points: z.number().int().min(1, "Pontos devem ser maior que 0."),
});
