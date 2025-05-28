import { supabase } from "../db/supabaseConnection.js";

export class UserPointsRepository {
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("user_points")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(`Erro ao buscar pontos: ${error.message}`);
    return data;
  }

  async createUserPoints(userId: string, initialPoints = 0) {
    const { data, error } = await supabase
      .from("user_points")
      .insert({ user_id: userId, points: initialPoints })
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar pontos: ${error.message}`);
    return data;
  }

  async incrementPoints(userId: string, amount: number) {
    const { data, error } = await supabase.rpc("increment_user_points", {
      user_id_input: userId,
      increment_amount: amount,
    });

    if (error) throw new Error(`Erro ao incrementar pontos: ${error.message}`);
    return data;
  }

  async decrementPoints(userId: string, amount: number) {
    const { data, error } = await supabase.rpc("decrement_user_points", {
      user_id_input: userId,
      decrement_amount: amount,
    });

    if (error) throw new Error(`Erro ao decrementar pontos: ${error.message}`);
    return data;
  }

  async ensureUserPoints(userId: string) {
    const existing = await this.getByUserId(userId);
    if (!existing) {
      await this.createUserPoints(userId, 0);
    }
  }
}
