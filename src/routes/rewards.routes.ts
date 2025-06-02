import { FastifyInstance } from "fastify";
import { rewardsController } from "../controllers/reward.Controller.js";

const controller = new rewardsController();

export async function rewardsRoutes(app: FastifyInstance) {
  app.register(
    async (rewardsApp) => {
      rewardsApp.get("/", controller.getAllRewards);
      rewardsApp.post("/", controller.handleCreateReward);
    },
    { prefix: "/rewards" },
  );
}
