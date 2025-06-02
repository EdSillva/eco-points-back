import fastify from "fastify";
import { redeemedRewardsRoutes } from "./routes/redeemedRewards.routes.js";
import cors from "@fastify/cors";
import { rewardsRoutes } from "./routes/rewards.routes.js";
import { sustainableActionsRoutes } from "./routes/sustainableActions.routes.js";
// Initialize Fastify instance
const app = fastify();
app.register(redeemedRewardsRoutes);
app.register(rewardsRoutes);
app.register(sustainableActionsRoutes);
// Register CORS with default settings
await app.register(cors, {
    origin: true,
});
// Set the port from environment variable or default to 3335
const PORT = process.env.PORT ? Number(process.env.PORT) : 3335;
// Start the server
app.listen({ host: "0.0.0.0", port: PORT }).then(() => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
