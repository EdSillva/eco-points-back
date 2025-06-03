import { supabase } from "../db/supabaseConnection.js";

export class RedeemedRewardsRepository {
  async getUserIdWithRedeemedReward(userId: string) {
    const { data, error } = await supabase
      .from("redeemed_rewards")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data;
  }

  async findById(rewardId: string) {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("id", rewardId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async decrementStock(rewardId: string) {
    const { error } = await supabase.rpc("decrement_reward_stock", {
      reward_id_input: rewardId,
    });
    if (error) throw new Error(error.message);
  }

  async createRedeemedReward(redeemedData: {
    reward_id: string;
    user_id: string;
    reward_name: string;
  }) {
    const { error } = await supabase.from("redeemed_rewards").insert({
      ...redeemedData,
      redeemed_at: new Date().toISOString(),
    });

    if (error) throw new Error(error.message);
  }
}
