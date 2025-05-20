import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseURL: string = process.env.SUPABASE_URL || "http://komcfqzajrlrspxaednt.supabase.co";
const supabaseKey: string = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbWNmcXphanJscnNweGFlZG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5OTQ4NjYsImV4cCI6MjA2MjU3MDg2Nn0.WzcB7PshJ0idrj26LeaPYEhMSxcX0MsXYZeK5KlBqZM";

const supabase: SupabaseClient = createClient(supabaseURL, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

export { supabase };
