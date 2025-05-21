import { FastifyInstance } from "fastify";
import { getAllRewardsController } from "../controllers/reward.Controller.js";

export async function rewardsRoutes(app: FastifyInstance) {
  app.get("/rewards", getAllRewardsController);
}
