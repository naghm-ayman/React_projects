import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zgwxgstpihegqzhvzgln.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnd3hnc3RwaWhlZ3F6aHZ6Z2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTY1MjAsImV4cCI6MjA3ODA5MjUyMH0.bwK3H9HA--Q7Z1MZbEJCca-Zhir821wTJmiVuIv6jF8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
