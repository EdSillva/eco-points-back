import { FastifyRequest, FastifyReply } from "fastify";
import { RewardsService } from "../services/rewards.service.js";
import { createRewardSchema } from "../schemas/rewardValidates/rewardsSchema.validate.js";
import { verifyFirebaseToken } from "../utils/middleware/firebaseAuth.js";
import { supabase } from "../db/supabaseConnection.js";

const service = new RewardsService();

export class rewardsController {
  async handleCreateReward(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply
        .status(401)
        .send({ error: "Token de autenticação não enviado." });
    }

    const token = authHeader.split(" ")[1];

    let partnerId: string;

    try {
      const decoded = await verifyFirebaseToken(token);
      const firebaseUID = decoded.uid;

      // ✅ Buscar partner_id com base no firebase_uid
      const { data: partner, error } = await supabase
        .from("partners")
        .select("id")
        .eq("firebase_uid", firebaseUID)
        .single();

      if (error || !partner) {
        return reply
          .status(404)
          .send({ error: "Parceiro não encontrado para este usuário." });
      }

      partnerId = partner.id; // 🎯 Agora sim, o UUID correto
    } catch (err) {
      return reply.status(401).send({ error: "Token inválido ou expirado." });
    }

    try {
      const validatedBody = createRewardSchema.parse(request.body);
      const reward = await service.createReward(validatedBody, partnerId);

      return reply.status(201).send({
        message: "Recompensa criada com sucesso.",
        reward,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return reply
          .status(400)
          .send({ error: "Erro de validação", issues: error.issues });
      }

      return reply.status(500).send({
        error: "Erro interno",
        detail: error.message,
      });
    }
  }

  async getAllRewards(request: FastifyRequest, reply: FastifyReply) {
    try {
      const rewards = await service.getAllRewards();
      return reply.send(rewards);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao buscar recompensas." });
    }
  }
}
