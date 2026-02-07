import { supabase, Product } from '../lib/supabase'

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return data || []
}

// Get available products only
export const getAvailableProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching available products:', error)
    throw error
  }

  return data || []
}

// Get weekly special products
export const getWeeklySpecials = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_weekly_special', true)
    .eq('is_available', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching weekly specials:', error)
    throw error
  }

  return data || []
}

// Get single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    throw error
  }

  return data
}

// Create new product (Admin only)
export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw error
  }

  return data
}

// Update product (Admin only)
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw error
  }

  return data
}

// Delete product (Admin only)
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

// Toggle product availability
export const toggleProductAvailability = async (id: string, isAvailable: boolean): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({ is_available: isAvailable, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error toggling availability:', error)
    throw error
  }

  return data
}