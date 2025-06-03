import { RewardsRepository } from "../repositories/reward.repository.js";
export class RewardsService {
    rewardsRepository = new RewardsRepository();
    async createReward(input, partnerId) {
        return await this.rewardsRepository.createReward({
            ...input,
            partner_id: partnerId,
        });
    }
    async getAllRewards() {
        return await this.rewardsRepository.getAllRewards();
    }
}
