import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
// Get them from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  is_available: boolean
  is_weekly_special: boolean
  created_at: string
  updated_at: string
}