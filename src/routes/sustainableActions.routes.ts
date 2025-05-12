import { FastifyInstance } from "fastify";
import { z } from "zod";
import { supabase } from "../db/supabaseConnection.js";
import { verifyFirebaseToken } from "../utils/middleware/firebaseAuth.js";

export async function sustainableActionsRoutes(app: FastifyInstance) {
  app.get("/sustainable-actions", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply
        .status(401)
        .send({ error: "Token de autenticação não enviado." });
    }

    const token = authHeader.split(" ")[1];
    let userId: string;
    
    try {
      const decoded = await verifyFirebaseToken(token);
      userId = decoded.uid;
    } catch (err) {
      return reply.status(401).send({ error: "Token inválido ou expirado." });
    }

    const { data, error } = await supabase
      .from("sustainableAction")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return reply.status(500).send({
        error: "Erro ao buscar ações sustentáveis.",
        detail: String(error),
      });
    }

    return reply.status(200).send(data);
  });
  
  app.post("/sustainable-actions", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply
        .status(401)
        .send({ error: "Token de autenticação não enviado." });
    }

    const token = authHeader.split(" ")[1];
    let userId: string;

    try {
      const decoded = await verifyFirebaseToken(token);
      userId = decoded.uid;
    } catch (err) {
      return reply.status(401).send({ error: "Token inválido ou expirado." });
    }

    const bodySchema = z.object({
      title: z.string().min(1, "Título não pode estar vazio."),
      description: z.string().min(1, "Descrição não pode estar vazia."),
      points: z.number().int().min(1, "Pontos devem ser maior que 0."),
    });

    let validatedBody;

    try {
      validatedBody = bodySchema.parse(request.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: "Erro de validação",
          issues: error.issues,
        });
      }

      return reply.status(500).send({
        error: "Erro desconhecido",
        detail: String(error),
      });
    }

    const { title, description, points } = validatedBody;

    const { data, error } = await supabase
      .from("sustainableAction")
      .insert({ title, description, points, user_id: userId })
      .select()
      .single();

    return reply.status(201).send({
      message: "Ação sustentável registrada com sucesso.",
      action: data,
    });
  });
}
