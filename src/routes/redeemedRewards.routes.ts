import { FastifyInstance } from "fastify";
import { supabase } from "../db/supabaseConnection.js";
import { verifyFirebaseToken } from "../utils/middleware/firebaseAuth.js";

export async function redeemedRewardsRoutes(app: FastifyInstance) {
  app.get("/redeemed-rewards", async (request, reply) => {
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
      .from("redeemed_rewards")
      .select("reward_name, redeemed_at")
      .eq("user_id", userId);

    if (error) {
      return reply.status(500).send({
        error: "Erro ao buscar recompensas resgatadas.",
        detail: error.message || String(error),
      });
    }

    if (!data || data.length === 0) {
      return reply.status(200).send({
        message: "Nenhuma recompensa resgatada encontrada para este usuário.",
      });
    }

    return reply.status(200).send(data);
  });
}
