import { RedeemedRewardsRepository } from "../repositories/redeemedRewards.repository.js";

export class RedeemedRewardsService {
  private repository = new RedeemedRewardsRepository();

  async getUserRedeemedRewards(userId: string) {
    const data = await this.repository.findByUserId(userId);

    if (!data || data.length === 0) {
      return null;
    }

    return data;
  }
}
