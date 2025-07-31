import { createClient } from '@supabase/supabase-js';

const URL = 'https://pdquxzrmofhxqoseesjc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcXV4enJtb2ZoeHFvc2Vlc2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODA0OTIsImV4cCI6MjA2OTU1NjQ5Mn0.D5F4OxJ7TZtH2DrZAxSQsWUhXsC3tPjWR7Sfi9YU5Wc';

export const supabase = createClient(URL, API_KEY);
