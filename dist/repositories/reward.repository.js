import { supabase } from "../db/supabaseConnection.js";
export class RewardsRepository {
    async getAllRewards() {
        const { data, error } = await supabase
            .from("rewards")
            .select("id, name, description, points_required, stock, partner_id");
        if (error)
            throw new Error(`Erro ao buscar recompensas: ${error.message}`);
        return data;
    }
    async getRewardsByName(name) {
        const { data, error } = await supabase
            .from("rewards")
            .select("id, name, description, points_required, stock, partner_id")
            .eq("name", name);
        if (error)
            throw new Error(`Erro ao buscar recompensa: ${error.message}`);
        return data;
    }
    async createReward(data) {
        const { data: reward, error } = await supabase
            .from("rewards")
            .insert([{ ...data }])
            .select()
            .single();
        if (error)
            throw new Error(`Erro ao criar recompensa: ${error.message}`);
        return reward;
    }
}
