import { FC } from "react"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
}

interface ProductGridProps {
  products: Product[]
  onAddToCart: (id: number) => void
}

const ProductGrid: FC<ProductGridProps> = ({ products, onAddToCart }) => (
  <section id="products" className="section-bg-green py-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-black text-black mb-4">Weekly Flavors</h2>
        <p className="text-xl text-gray-800 font-medium">Four new or returning flavors drop every Monday. Try them before they're gone!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="cookie-card fade-in-up">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6 space-y-4">
              <div className="badge">
                This Week Only
              </div>
              <h3 className="text-2xl font-black text-black">{product.name}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-3xl font-black text-black">{product.price.toFixed(3)} <span className="text-lg">TND</span></span>
                <button 
                  onClick={() => onAddToCart(product.id)}
                  className="btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ProductGrid
