import { FC } from "react"

interface Product {
  id: number
  name: string
  price: number
}

interface CartItem {
  product: Product
  qty: number
}

interface CartDrawerProps {
  cart: CartItem[]
  total: number
  open: boolean
  onClose: () => void
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const CartDrawer: FC<CartDrawerProps> = ({ cart, total, open, onClose, setCart }) => {
  const handleCheckout = () => {
    // TODO: Integrate payment gateway here
    alert(`Commande de ${total.toFixed(3)} TND envoyée ! Intégrez votre gateway TND ici.`)
    setCart([])
    onClose()
  }

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 ${open ? 'bg-black/30 backdrop-blur-sm' : 'invisible opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Panier ({cart.length})</h2>
            <button onClick={onClose} className="text-3xl">×</button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Votre panier est vide</p>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div>
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">{item.product.price.toFixed(3)} TND × {item.qty}</p>
                </div>
                <span className="font-bold text-lg">{(item.product.price * item.qty).toFixed(3)} TND</span>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>{total.toFixed(3)} TND</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full btn-primary py-4 text-lg font-bold shadow-xl hover:shadow-2xl"
            disabled={cart.length === 0}
          >
            Passer au paiement
          </button>
          <p className="text-xs text-gray-500 text-center">
            Intégrez Stripe/TransFi pour TND ici
          </p>
        </div>
      </div>
    </>
  )
}

export default CartDrawer
