import { FastifyInstance } from "fastify";
import { RedeemedRewardsController } from "../controllers/redeemedRewardsControllers/redeemedRewards.controller.js";

const controller = new RedeemedRewardsController();

export async function redeemedRewardsRoutes(app: FastifyInstance) {
  app.get("/redeemed-rewards", controller.getRedeemedRewards.bind(controller));
}
