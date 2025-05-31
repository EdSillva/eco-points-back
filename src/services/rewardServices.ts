import { supabase } from '../utils/supabase';

export async function createReward(data: any, partnerId: string) {
  const { data: reward, error } = await supabase
    .from('rewards')
    .insert([{ ...data, partner_id: partnerId }])
    .select()
    .single();

  if (error) throw error;
  return reward;
}
