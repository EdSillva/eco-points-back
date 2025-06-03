import { RewardsRepository } from "../repositories/reward.repository.js";
import { CreateRewardInput } from "../schemas/rewardValidates/rewardsSchema.validate.js";

export class RewardsService {
  private rewardsRepository = new RewardsRepository();
  async createReward(input: CreateRewardInput, partnerId: string) {
    return await this.rewardsRepository.createReward({
      ...input,
      partner_id: partnerId,
    });
  }

  async getAllRewards() {
    return await this.rewardsRepository.getAllRewards();
  }
}
