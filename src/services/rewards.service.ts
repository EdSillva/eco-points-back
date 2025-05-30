import { rewardsRepository } from "../repositories/reward.repository.js";

const repository = new rewardsRepository();

export class RewardsService {
    async getAllRewards(name ?: string) {
        if (name) {
            return await repository.getRewardsByName(name);
        }
        return await repository.getAllRewards();
    }
}
