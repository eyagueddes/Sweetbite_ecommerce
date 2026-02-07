# 🍪 Sweetbite E-commerce - Full-Stack Database Setup Guide

## 🎯 Overview

This guide will help you transform your static React frontend into a fully dynamic full-stack application using **Supabase** as your backend database solution.

## ✅ What Has Been Implemented

### 1. **Supabase Client Configuration** (`src/lib/supabase.ts`)
- Supabase client initialization
- TypeScript interfaces for Product model
- Environment variable configuration

### 2. **Product API Service** (`src/services/productService.ts`)
- `getAllProducts()` - Fetch all products
- `getAvailableProducts()` - Fetch only available products
- `getWeeklySpecials()` - Fetch weekly special products
- `getProductById(id)` - Fetch single product
- `createProduct(data)` - Create new product (Admin)
- `updateProduct(id, data)` - Update product (Admin)
- `deleteProduct(id)` - Delete product (Admin)
- `toggleProductAvailability(id, status)` - Toggle availability

---

## 📋 Step-by-Step Setup Instructions

### **STEP 1: Create Supabase Account & Project**

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (free tier available)
3. Create a new project:
   - Project name: `sweetbite-ecommerce`
   - Database password: (create a strong password - SAVE THIS!)
   - Region: Choose closest to Tunisia (Europe West recommended)
   - Wait 2-3 minutes for project setup

### **STEP 2: Create Database Schema**

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL schema:

```sql
-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 3) NOT NULL,
  image_url TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  is_weekly_special BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_products_weekly ON products(is_weekly_special);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read products
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert/update/delete
-- (We'll set this up later for admin access)
CREATE POLICY "Allow authenticated users to manage products" ON products
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, is_available, is_weekly_special) VALUES
('Cookie Chocolat', 'Délicieux cookie au chocolat noir belge', 6.500, 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg', true, true),
('Cookie Pistache & Matcha', 'Cookie unique au pistache et thé vert matcha', 8.500, 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg', true, true),
('Cookie Red Velvet', 'Cookie velours rouge avec glaçage fromage', 7.500, 'https://images.pexels.com/photos/4686956/pexels-photo-4686956.jpeg', true, true),
('Cookie Caramel Salé', 'Cookie caramel salé avec éclats de sel de mer', 7.000, 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg', true, true);
```

4. Click "Run" to execute the SQL
5. Verify the table was created: Go to **Table Editor** > You should see "products" table

### **STEP 3: Get Your Supabase Credentials**

1. In your Supabase project, go to **Settings** > **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### **STEP 4: Configure Environment Variables**

1. In your project root, create a file named `.env`
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **IMPORTANT**: Add `.env` to your `.gitignore` file:
```
.env
.env.local
```

### **STEP 5: Update App.tsx to Use Database**

Replace the static products array in `src/App.tsx` with dynamic data fetching.

Find this section:
```typescript
const [products] = useState([
  // ... static products
]);
```

Replace with:
```typescript
import { useEffect } from 'react'
import { getWeeklySpecials } from './services/productService'
import type { Product } from './lib/supabase'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getWeeklySpecials()
        setProducts(data)
      } catch (err) {
        console.error('Error loading products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>

  // ... rest of your App component
}
```

### **STEP 6: Update ProductGrid Component**

Modify `src/components/ProductGrid.tsx` to accept the correct Product type:

```typescript
import type { Product } from '../lib/supabase'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (id: string) => void // Changed from number to string (UUID)
}
```

### **STEP 7: Test Your Application**

1. Restart your dev server:
```bash
npm run dev
```

2. Open your browser - you should now see products loaded from Supabase!
3. Check browser console for any errors
4. Verify products are displaying correctly

---

## 🎨 Next Steps: Admin Dashboard (Optional)

To create an admin interface for managing products, you can:

1. **Create Admin Component** (`src/components/Admin.tsx`)
2. **Add Authentication** using Supabase Auth
3. **Build Product Management UI**:
   - Add/Edit/Delete products
   - Upload product images to Supabase Storage
   - Toggle availability
   - Mark weekly specials

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** to Git
2. **Use Row Level Security (RLS)** policies in Supabase
3. **Implement authentication** before allowing admin operations
4. **Validate all inputs** on both frontend and database level
5. **Use prepared statements** (Supabase does this automatically)

---

## 📊 Database Schema Reference

### Products Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `name` | TEXT | Product name |
| `description` | TEXT | Product description |
| `price` | NUMERIC(10,3) | Price in TND |
| `image_url` | TEXT | Product image URL |
| `is_available` | BOOLEAN | Product availability status |
| `is_weekly_special` | BOOLEAN | Mark as weekly special |
| `created_at` | TIMESTAMP | Creation date |
| `updated_at` | TIMESTAMP | Last update date |

---

## 🆘 Troubleshooting

### Issue: "Failed to fetch products"
**Solution**: Check your `.env` file has correct Supabase credentials

### Issue: "CORS error"
**Solution**: Verify your Supabase project URL is correct

### Issue: "Unauthorized"
**Solution**: Check Row Level Security policies in Supabase

### Issue: "Module not found"
**Solution**: Run `npm install` again

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## ✅ Implementation Checklist

- [ ] Created Supabase account and project
- [ ] Executed database schema SQL
- [ ] Copied Supabase credentials
- [ ] Created `.env` file with credentials
- [ ] Added `.env` to `.gitignore`
- [ ] Updated App.tsx to fetch from database
- [ ] Updated ProductGrid component types
- [ ] Tested application
- [ ] Verified products load from database
- [ ] (Optional) Set up admin dashboard
- [ ] (Optional) Implemented authentication

---

🎉 **Congratulations!** Your Sweetbite e-commerce is now a full-stack application with a PostgreSQL database!
