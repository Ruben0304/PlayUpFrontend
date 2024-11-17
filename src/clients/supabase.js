import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://tnuvhxvelwizhieiiglq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudXZoeHZlbHdpemhpZWlpZ2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4MzMyNzcsImV4cCI6MjAwNTQwOTI3N30.wP9ElDDyd33j2Z-Sz1RaW7Q3vTbtURLH8opLSJ0-3Tk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;