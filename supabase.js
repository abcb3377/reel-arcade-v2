import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://vcsppqacyaomagqpsuyq.supabase.co";
const SUPABASE_KEY = "sb_publishable_2eLckH_1_dQalFdTAPig8Q_mHG0fkoW";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
