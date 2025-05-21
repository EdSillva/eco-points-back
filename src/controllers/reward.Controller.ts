import { FastifyRequest, FastifyReply } from "fastify";
import { getAllRewardsService } from "../services/rewards.service.js";

export async function getAllRewardsController(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.query as { name?: string };

    try {
        const rewards = await getAllRewardsService(name);
        return reply.send(rewards);
    } catch (error) {
        return reply.status(500).send({ error: "Erro ao buscar recompensas." });
    }
}
