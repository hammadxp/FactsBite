import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lwhwscufycyvuowefoph.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aHdzY3VmeWN5dnVvd2Vmb3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1OTM4NTIsImV4cCI6MTk5NjE2OTg1Mn0.2NvwzVI-p15qIov9Q-y2974Dm05HEEntpx2S3durkTs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
