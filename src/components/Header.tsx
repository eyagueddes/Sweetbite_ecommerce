import { FC } from "react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

const Header: FC<HeaderProps> = ({ cartCount, onCartClick }) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          SweetBite
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#products" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors">Cookies</a>
          <a href="#about" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors">À propos</a>
          <a href="#contact" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
        </nav>
        <button 
          onClick={onCartClick}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all"
        >
          🛒 {cartCount > 0 && <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-sm font-bold">{cartCount}</span>}
        </button>
      </div>
    </div>
  </header>
)

export default Header
