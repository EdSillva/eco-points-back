import fastify from "fastify";
import { redeemedRewardsRoutes } from "./routes/redeemedRewards.routes.js";

const app = fastify();

app.register(redeemedRewardsRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3335;

app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
