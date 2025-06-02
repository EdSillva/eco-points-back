import { supabase } from "../db/supabaseConnection.js";
import { CreateSustainableActionInput } from "../interfaces/createSustainableAction.interface.js";

export class SustainableActionRepository {
  async insertSustainableAction(data: CreateSustainableActionInput) {
    return await supabase
      .from("sustainable_action")
      .insert(data)
      .select("*")
      .maybeSingle();
  }
  async deleteSustainableAction(id: string, userId: string) {
    return await supabase
      .from("sustainable_action")
      .delete()
      .match({ id, user_id: userId })
      .select();
  }

  async getByUserId(userId: string) {
    return await supabase
      .from("sustainable_action")
      .select("*")
      .eq("user_id", userId);
  }

  async updateById(
    id: string,
    input: { title: string; description: string },
    userId: string,
  ) {
    return await supabase
      .from("sustainable_action")
      .update(input)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();
  }
}
