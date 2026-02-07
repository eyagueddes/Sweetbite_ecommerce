import { FC } from "react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

const Header: FC<HeaderProps> = ({ cartCount, onCartClick }) => (
  <header className="sticky top-0 z-50 bg-pink-50/95 backdrop-blur-md border-b border-pink-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="text-4xl font-black text-black">
          crumbl
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#products" className="text-base font-semibold text-black hover:text-gray-700 transition-colors">Cookies</a>
          <a href="#about" className="text-base font-semibold text-black hover:text-gray-700 transition-colors">About</a>
          <a href="#contact" className="text-base font-semibold text-black hover:text-gray-700 transition-colors">Contact</a>
        </nav>
        <button 
          onClick={onCartClick}
          className="btn-primary"
        >
          🛒 {cartCount > 0 && <span className="bg-pink-300 text-black px-2 py-1 rounded-full text-sm font-bold ml-2">{cartCount}</span>}
        </button>
      </div>
    </div>
  </header>
)

export default Header
