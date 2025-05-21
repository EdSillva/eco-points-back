import { supabase } from "../db/supabaseConnection.js";

export async function getAllRewards() {
    const { data, error } = await supabase
        .from("rewards")
        .select("id, name, description, points_required, stock, partner_id");

    if (error) throw new Error(error.message);
    return data;
}

export async function getRewardsByName(name: string) {
    const { data, error } = await supabase
        .from("rewards")
        .select("id, name, description, points_required, stock, partner_id")
        .eq("name", name);

    if (error) throw new Error(error.message);
    return data;
}
