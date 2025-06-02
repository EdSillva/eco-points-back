import { supabase } from "../db/supabaseConnection.js";
export class SustainableActionRepository {
    async insertSustainableAction(data) {
        return await supabase
            .from("sustainable_action")
            .insert(data)
            .select("*")
            .maybeSingle();
    }
    async deleteSustainableAction(id, userId) {
        return await supabase
            .from("sustainable_action")
            .delete()
            .match({ id, user_id: userId })
            .select();
    }
    async getByUserId(userId) {
        return await supabase
            .from("sustainable_action")
            .select("*")
            .eq("user_id", userId);
    }
    async updateById(id, input, userId) {
        return await supabase
            .from("sustainable_action")
            .update(input)
            .eq("id", id)
            .eq("user_id", userId)
            .select()
            .single();
    }
}
