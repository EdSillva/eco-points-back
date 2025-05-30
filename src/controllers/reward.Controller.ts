import { FastifyRequest, FastifyReply } from "fastify";
import { RewardsService } from "../services/rewards.service.js";

const service = new RewardsService();

export class rewardsController {
  async getAllRewards(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.query as { name?: string };

    try {
      const rewards = await service.getAllRewards(name);
      return reply.send(rewards);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao buscar recompensas." });
    }
  }
}
