import { supabase } from "../db/supabaseConnection.js";

export class sustainableAction {
  async insertSustainableAction(data: {
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
  async deleteSustainableAction(id: string, userId: string) {
    return await supabase
      .from("sustainableAction")
      .delete()
      .match({ id, user_id: userId });
  }
}
