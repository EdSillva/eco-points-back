import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseURL: string = process.env.SUPABASE_URL || " ";
const supabaseKey: string = process.env.SUPABASE_KEY || " ";

const supabase: SupabaseClient = createClient(supabaseURL, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

export { supabase };
