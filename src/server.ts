import fastify from "fastify";
import { rewardsRoutes } from "./routes/rewards.routes.js";

const app = fastify();

app.register(rewardsRoutes);

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3335,
  })
  .then(() => {
    console.log("Servidor Rodando!!");
  });
