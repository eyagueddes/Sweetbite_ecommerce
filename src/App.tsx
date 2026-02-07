import { useState, useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductGrid from "./components/ProductGrid"
import About from "./components/About"
import Contact from "./components/Contact"
import CartDrawer from "./components/CartDrawer"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
}

export default function App() {
  const [products] = useState<Product[]>([
    { id: 1, name: "Cookie Chocolat Chunk", price: 6.5, description: "80g", image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, name: "Cookie Pistache & Caramel", price: 7.0, description: "Caramel beurre salé", image: "https://imgs.search.brave.com/Hd1pQxqsW7wnWsw89HqTfn5ewU-N4R3zG1d58cCqZHY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sZXNy/ZWNldHRlc2RlbWVs/YW5pZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDcv/Y29va2llcy1waXN0/YWNoZS02LXBob3Rv/Z3JhcGhlLWN1bGlu/YWlyZS1tZWxhbmll/LXJvdXNzZWxsZS04/NDR4MTUwMC5qcGc" },
 {
    id: 4,
    name: "Cookie Red Velvet",
    price: 7.5,
    description: "Cream cheese frosting tunisien",
    image: "https://imgs.search.brave.com/yPULA8Jv0Rg9bzsd01kJZijrtAERfBkTdplcd9UjbBQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ob3Vz/ZW9mbmFzaGVhdHMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzAxL1JlZC1W/ZWx2ZXQtV2hpdGUt/Q2hvY29sYXRlLUNo/aXAtQ29va2llcy0x/MS5qcGc"
  },
    { id: 4, name: "Cookie Red Velvet", price: 7.5, description: "Cream cheese", image: "https://images.pexels.com/photos/1028708/pexels-photo-1028708.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ])

  const [cart, setCart] = useState<{product: Product, qty: number}[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (id: number) => {
    setCart(c => {
      const existing = c.find(item => item.product.id === id)
      if (existing) {
        return c.map(item => item.product.id === id ? {...item, qty: item.qty + 1} : item)
      }
      const product = products.find(p => p.id === id)!
      return [...c, {product, qty: 1}]
    })
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        <ProductGrid products={products} onAddToCart={addToCart} />
        <About />
        <Contact />
      </main>
      <CartDrawer cart={cart} total={cartTotal} open={cartOpen} onClose={() => setCartOpen(false)} setCart={setCart} />
    </>
  )
}
