import { useState, useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductGrid from "./components/ProductGrid"
import About from "./components/About"
import Contact from "./components/Contact"
import CartDrawer from "./components/CartDrawer"
import { getAllProducts } from "./lib/src/services/productService"
import { Product } from "./lib/supabase"

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Load products from Supabase
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (err) {
        setError('Failed to load products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  useEffect(() => {
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0))
    setCartTotal(
      cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    )
  }, [cart])

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.product.id !== productId))
    } else {
      setCart(cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious cookies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        <ProductGrid products={products} onAddToCart={addToCart} />
        <About />
        <Contact />
      </main>
      <CartDrawer 
        cart={cart} 
        total={cartTotal} 
        open={cartOpen}
        onClose={() => setCartOpen(false)} 
        setCart={setCart} 
      />
    </>
  )
}