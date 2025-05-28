import { FastifyInstance } from "fastify";
import { SustainableActionController } from "../controllers/sustainableActions.controller.js";

const controller = new SustainableActionController();

export async function sustainableActionsRoutes(app: FastifyInstance) {
  app.register(
    async (sustainableApp) => {
      sustainableApp.get("/", controller.getUserSustainableActions);
      sustainableApp.post("/", controller.createSustainableAction);
      sustainableApp.put("/:id", controller.updateSustainableAction);
      sustainableApp.delete("/:id", controller.deleteSustainableAction);
    },
    { prefix: "/sustainable-actions" },
  );
}
