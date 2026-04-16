import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartModal, { CartItem } from "./components/CartModal";
import { Product } from "./components/ProductCard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function StoreFront() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white text-center py-2.5 text-xs tracking-[0.2em] uppercase font-medium">
        150,000₮-аас дээш захиалгад үнэгүй хүргэлт
      </div>
      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />
      <Hero />
      <ProductGrid addToCart={addToCart} />
      <Features />
      <Contact />
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}

function ProtectedAdmin() {
  const isAuth = sessionStorage.getItem("adminAuth") === "true";
  return isAuth ? <AdminDashboard /> : <Navigate to="/admin" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreFront />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedAdmin />} />
    </Routes>
  );
}
