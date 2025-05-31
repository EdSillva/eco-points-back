import { FastifyInstance } from 'fastify';
import { handleCreateReward } from "../controllers/rewardController";

export async function rewardRoutes(app: FastifyInstance) {
  app.post('/rewards', { preHandler: [app.authenticate] }, handleCreateReward);
}
