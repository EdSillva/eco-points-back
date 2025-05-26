import { supabase } from "../db/supabaseConnection.js";

export class RedeemedRewardsRepository {
  async findByUserId(userId: string) {
    const { data, error } = await supabase
      .from("redeemed_rewards")
      .select("reward_name, redeemed_at")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
