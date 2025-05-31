import { FastifyInstance } from 'fastify';
import { handleCreateReward } from "../controllers/reward.Controller";

export async function rewardRoutes(app: FastifyInstance) {
  app.post('/rewards', { preHandler: [app.authenticate] }, handleCreateReward);
}
