# 🥐 SweetBite Cookies - React Ecommerce

**React 18 + Vite + TailwindCSS + TypeScript**  
Ecommerce cookies shop TND, responsive, cart, payment-ready.

## 🚀 Quick Start

```bash
# 1. Unzip the project
unzip sweetbite-react-ecommerce.zip

# 2. cd into folder
cd sweetbite-react

# 3. Install
npm install

# 4. Run
npm run dev
```

**Open:** http://localhost:5173

## ✨ Features

- ⚡ Vite + React 18 + TypeScript (modern stack)
- 📱 Fully responsive (mobile-first)
- 🛒 Interactive cart drawer
- 💰 TND currency (6.500 TND format)
- 🎨 TailwindCSS + custom design
- 🚀 Production-ready build (`npm run build`)

## 💳 Payment Integration

In `CartDrawer.tsx`, replace `alert()` with your gateway:

```tsx
// Example Stripe
const handleCheckout = async () => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({ amount: total * 100 })
  })
  const { clientSecret } = await response.json()
  // Stripe redirect...
}
```

**Recommended TND gateways:** Stripe, TransFi[web:10]

## 📁 Structure

```
src/
├── components/     # All UI components
├── App.tsx         # Main app
└── main.tsx        # Entry point
```

## 🛠️ Customize

- Add products: `App.tsx` `products` array
- Change images: Update Pexels URLs
- Colors: Tailwind config
- Payment: CartDrawer checkout handler

**Enjoy your cookies shop!** 🍪
