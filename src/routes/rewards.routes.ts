import { FastifyInstance } from "fastify";
import { supabase } from "../supabaseConnection.js";

export async function rewardsRoutes(app: FastifyInstance) {
  app.get("/rewards", async (request, reply) => {
    const { name } = request.query as { name?: string };

    let query = supabase  
      .from("rewards")
      .select("id, name, description, points_required, stock, partner_id");

    if (name) { 
      query = query.eq("name", name);
    }

    const { data, error } = await query;

    if (error) {
      return reply.status(500).send({ error: "Erro ao buscar recompensas." });
    }

    return reply.send(data);
  });
}
