import { FastifyInstance } from "fastify";
import { rewardsController } from "../controllers/reward.Controller.js";

const controller = new rewardsController();

export async function rewardsRoutes(app: FastifyInstance) {
  app.get("/rewards", controller.getAllRewards);
}
