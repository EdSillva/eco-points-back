import { supabase } from "../db/supabaseConnection";

export async function insertSustainableAction(data: {
    title: string;
    description: string;
    points: number;
    user_id: string;
}) {
    return await supabase
        .from("sustainableAction")
        .insert(data)
        .select("*")
        .maybeSingle();
}
