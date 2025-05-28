import { supabase } from "../db/supabaseConnection.js";

export class rewardsRepository {
    async getAllRewards() {
        const { data, error } = await supabase
            .from("rewards")
            .select("id, name, description, points_required, stock, partner_id");

        if (error) throw new Error(error.message);
        return data;
    }

    async getRewardsByName(name: string) {
        const { data, error } = await supabase
            .from("rewards")
            .select("id, name, description, points_required, stock, partner_id")
            .eq("name", name);

        if (error) throw new Error(error.message);
        return data;
    }
}
