import { FastifyReply, FastifyRequest } from "fastify";
import { RedeemedRewardsService } from "../../services/redeemedRewardsServices/readRedeemedRewards.service.js";
import { verifyFirebaseToken } from "../../utils/middleware/firebaseAuth.js";

const service = new RedeemedRewardsService();

export class RedeemedRewardsController {
  async getRedeemedRewards(request: FastifyRequest, reply: FastifyReply) {
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

    try {
      const data = await service.getUserRedeemedRewards(userId);

      if (!data) {
        return reply.status(200).send({
          message: "Nenhuma recompensa resgatada encontrada para este usuário.",
        });
      }

      return reply.status(200).send(data);
    } catch (error: any) {
      return reply.status(500).send({
        error: "Erro ao buscar recompensas resgatadas.",
        detail: error.message || String(error),
      });
    }
  }
}
