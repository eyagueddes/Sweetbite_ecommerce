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
  <section id="products">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Cookies Stars</h2>
      <p className="text-xl text-gray-600">Faits main chaque jour avec amour ❤️</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <div key={product.id} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-500">{product.price.toFixed(3)} <span className="text-sm font-normal">TND</span></span>
              <button 
                onClick={() => onAddToCart(product.id)}
                className="btn-primary px-6 py-2 font-semibold"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default ProductGrid
