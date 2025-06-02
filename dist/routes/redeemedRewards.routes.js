import { RedeemedRewardsController } from "../controllers/redeemedRewards.controller.js";
const controller = new RedeemedRewardsController();
export async function redeemedRewardsRoutes(app) {
    app.register(async (redeemedRewardsApp) => {
        redeemedRewardsApp.get("/", controller.getRedeemedRewards.bind(controller));
        redeemedRewardsApp.post("/redeem", controller.redeemReward.bind(controller));
    }, { prefix: "/redeemed-rewards" });
}
