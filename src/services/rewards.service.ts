import { getAllRewards, getRewardsByName } from "../repositories/reward.repository.js";

export async function getAllRewardsService(name?: string) {
    if (name) {
        return await getRewardsByName(name);
    }
    return await getAllRewards();
}
