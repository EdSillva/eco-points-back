import fastify from "fastify";
import cors from '@fastify/cors';
import { rewardsRoutes } from "./routes/rewards.routes.js";
import { sustainableActionsRoutes } from "./routes/sustainableActions.routes.js";

const app = fastify();

app.register(rewardsRoutes);
app.register(sustainableActionsRoutes);
await app.register(cors, {
  origin: true,
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3335;

app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
