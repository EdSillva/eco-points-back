import { FastifyInstance } from "fastify";
import { supabase } from "../db/supabaseConnection.js";

export async function rewardsRoutes(app: FastifyInstance) {
  app.get("/rewards", async (request, reply) => {
    const { category } = request.query as { category?: string };

    let query = supabase
      .from("rewards")

      .select("id, name, description, category, points, partner_name");
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return reply.status(500).send({ error: "Erro ao buscar recompensas." });
    }

    return reply.send(data);
  });
}
